const log = require("fruster-log");
const Db = require("mongodb").Db;

const constants = require("../constants");
const errors = require("../errors");

const FooModel = require("../models/FooModel");

/**
 * A repository meant to handle any operations to the database, in this case mongo db.
 *
 * Avoid placing business logic or anything related to bus messages in here.
 *
 * Note that we generally do not want to exposes the _id which is
 * created by mongo, hence the `{_id: 0}` to filter it out in queries and
 * `delete foo_id` in create.
 */
class FooRepo {

	/**
	 * @param {Db} db
	 */
	constructor(db) {
		this._collection = db.collection(constants.collections.FOOS);
	}

	/**
	 * Get Foo by id.
	 *
	 * @param {String} id
	 *
	 * @returns {Promise<FooModel>} Foo
	 */
	async getById(id) {
		try {
			const foo = await this._collection.findOne({
				id: id
			});

			return foo ? new FooModel(foo) : null;
		} catch (error) {
			this._handleError(error);
		}
	}

	/**
	 * Find all Foo's.
	 *
	 * @returns {Promise<Array<FooModel>>} promise
	 */
	async findAll() {
		try {
			return this._collection.find({}, {
				fields: {
					_id: 0
				}
			}).toArray();
		} catch (error) {
			this._handleError(error);
		}
	}

	/**
	 * Creates a new foo.
	 *
	 * @param {FooModel} foo
	 * @returns {Promise<FooModel>} created foo
	 */
	async create(foo) {
		try {
			const result = await this._collection.insertOne(foo);

			return new FooModel(result.ops[0]);
		} catch (error) {
			this._handleError(error);
		}
	}

	/**
	 * Updates Foo.
	 *
	 * @param  {String} fooId
	 * @param  {Object} changes
	 *
	 * @return {Promise<FooModel>} updated foo
	 */
	async update(fooId, changes) {
		try {
			await this._collection.updateOne({
				id: fooId
			}, {
					$set: changes
				});

			return await this.getById(fooId);
		} catch (error) {
			this._handleError(error);
		}
	}

	/**
	 * Handles errors.
	 * fruster error are thrown as is
	 * while other errors are converted to internal server fruster error.
	 *
	 * @param {Object} error
	 */
	_handleError(error) {
		log.error(error);

		if (!error.status)
			throw errors.internalServerError(error);

		throw error;
	}
}

module.exports = FooRepo;

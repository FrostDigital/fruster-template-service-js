const FooModel = require("../models/FooModel");
const constants = require("../constants");
const Db = require("mongodb").Db;

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
	 * @return {Promise<FooModel>} Foo
	 */
	async getById(id) {
		const foo = await this._collection.findOne({ id });

		return foo ? new FooModel(foo) : null;
	}

	/**
	 * Find all Foo's.
	 *
	 * @return {Promise<Array<FooModel>>} promise
	 */
	async findAll() {
		return this._collection.find({}, { fields: { _id: 0 } }).toArray();
	}

	/**
	 * Creates a new foo.
	 *
	 * @param {FooModel} foo
	 *
	 * @return {Promise<FooModel>} created foo
	 */
	async create(foo) {
		const result = await this._collection.insertOne(foo);

		return new FooModel(result.ops[0]);
	}

	/**
	 * Updates Foo.
	 *
	 * @param {String} id
	 * @param {Object} changes
	 *
	 * @return {Promise<FooModel>} updated foo
	 */
	async update(id, changes) {
		await this._collection.updateOne({ id }, { $set: changes });

		return await this.getById(id);
	}

}

module.exports = FooRepo;

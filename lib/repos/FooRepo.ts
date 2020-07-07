import { v4 as uuidV4 } from "uuid";
import { Db } from "mongodb";
import constants from "../constants";
import FooModel from "../models/FooModel";

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
	private _collection;

	constructor(db: Db) {
		this._collection = db.collection(constants.collections.FOOS);
	}

	/**
	 * Get Foo by id.
	 *
	 * @param {String} id
	 *
	 * @return {Promise<FooModel>} Foo
	 */
	async getById(id: string): Promise<FooModel> {
		return await this._collection.findOne({ id }, { _id: 0 });
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
	async create(foo: FooModel, createdBy: string): Promise<FooModel> {
		const { ops } = await this._collection.insertOne({
			...foo,
			id: uuidV4(),
			created: new Date(),
			createdBy
		});

		delete ops[0]._id;

		return ops[0];
	}

	/**
	 * Updates Foo.
	 *
	 * @param {String} id
	 * @param {Object} changes
	 *
	 * @return {Promise<FooModel>} updated foo
	 */
	async update(id: string, changes: object): Promise<FooModel> {
		await this._collection.updateOne({ id }, { $set: changes });

		return await this.getById(id);
	}

	/**
	 * Delete Foos by Bar id.
	 *
	 * @param  {Object} query
	 *
	 * @return {Promise<Number>} count of the deleted events
	 */
	async deleteByQuery(query: object): Promise<number> {
		return (await this._collection.deleteMany(query)).deletedCount;
	}
}

export default FooRepo;

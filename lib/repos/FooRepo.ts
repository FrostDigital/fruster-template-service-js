import { v4 as uuidV4 } from "uuid";
import { Db, Collection } from "mongodb";
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

	private collection: Collection;

	constructor(db: Db) {
		this.collection = db.collection(constants.collections.FOOS);
	}

	/**
	 * Get Foo by id.
	 */
	async getById(id: string): Promise<FooModel | null> {
		return await this.collection.findOne({ id }, { fields: { _id: 0 } });
	}

	/**
	 * Find all Foo's.
	 */
	async findAll(): Promise<FooModel[]> {
		return this.collection.find({}, { fields: { _id: 0 } }).toArray();
	}

	/**
	 * Creates a new foo.
	 */
	async create(foo: Partial<FooModel>, createdBy: string): Promise<FooModel> {
		const { ops } = await this.collection.insertOne({
			...foo,
			id: uuidV4(),
			metadata: {
				created: new Date(),
				createdBy
			}
		});

		delete ops[0]._id;
		return ops[0];
	}

	/**
	 * Updates Foo.
	 */
	async update(id: string, changes: object): Promise<FooModel | null> {
		await this.collection.updateOne({ id }, { $set: changes });

		return await this.getById(id);
	}

	/**
	 * Delete Foos by Bar id.
	 */
	async deleteByQuery(query: object): Promise<number> {
		const deletedCount = (await this.collection.deleteMany(query)).deletedCount;

		return deletedCount || 0;
	}
}

export default FooRepo;

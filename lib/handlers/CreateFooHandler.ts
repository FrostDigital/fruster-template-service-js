import { FrusterRequest, FrusterResponse } from "fruster-bus";
import FooRepo from "../repos/FooRepo";
import FooModel from "../models/FooModel";
import Publishes from "../Publishes";
const log = require("fruster-log");

/**
 * Handler to create foo.
 */
class CreateFooHandler {
	private fooRepo: FooRepo;

	/**
	 * @param {FooRepo} fooRepo
	 */
	constructor(fooRepo: FooRepo) {
		this.fooRepo = fooRepo;
	}

	/**
	 * Handle http request.
	 *
	 * @param {FrusterRequest} req
	 */
	async handleHttp({ reqId, data, user }: FrusterRequest<FooModel>): Promise<FrusterResponse<FooModel>> {
		const foo = await this.fooRepo.create(data, user.id);

		Publishes.fooCreated(reqId, foo.id);
		log.info("Publishes event for foo created");

		log.audit(user.id, `Foo is created - ${foo.id}`); //Log audit need when adding/modifying the db record

		return {
			reqId: "", //TODO: Why need this? Ask by Victor
			status: 201,
			data: foo
		};
	}
}

export default CreateFooHandler;

import { FrusterRequest, FrusterResponse } from "fruster-bus";
import FooManager from "../managers/FooManager";
import FooModel from "../models/FooModel";

interface GetFooRequest {
	id: string
}

/**
 * Handler to get foo by its id.
 */
class GetFooHandler {
	private fooManager: FooManager;

	/**
	 * @param {FooManager} fooManager
	 */
	constructor(fooManager: FooManager) {
		this.fooManager = fooManager;
	}

	/**
	 * Handle service request.
	 *
	 * @param {FrusterRequest} req
	 */
	async handle({ reqId, data: { id } }: FrusterRequest<GetFooRequest>): Promise<FrusterResponse<FooModel>> {
		const foo = await this.fooManager.getFooWithBarById(reqId, id);

		return {
			reqId: "", //TODO
			status: 200,
			data: foo
		};
	}
}

export default GetFooHandler;

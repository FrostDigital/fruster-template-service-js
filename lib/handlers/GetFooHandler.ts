import { FrusterRequest } from "fruster-bus";
import FooManager = require("../managers/FooManager");

interface ReqExample {
	id: string;
}

/**
 * Handler to get foo by its id.
 */
class GetFooHandler {
	private fooManager: FooManager;

	constructor(fooManager: FooManager) {
		this.fooManager = fooManager;
	}

	/**
	 * Handle service request.
	 *
	 */
	async handle({
		reqId,
		data: { id },
		query: { limit },
	}: FrusterRequest<ReqExample>) {
		const foo = await this.fooManager.getFooWithBarById(reqId, id);

		return {
			status: 200,
			data: foo,
		};
	}
}

export default GetFooHandler;

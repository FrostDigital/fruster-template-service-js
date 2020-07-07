import { FrusterRequest, FrusterResponse } from "fruster-bus";
import FooRepo from "../repos/FooRepo";
const log = require("fruster-log");

interface BarDeletedRequest {
	barId: string
}

interface BarDeletedResponse {
	deletedCount: number
}

/**
 * Listener for bar deleted
 */
class BarDeletedListener {

	constructor(private fooRepo: FooRepo) { }

	/**
	 * Handle listener
	 *
	 * @param {FrusterRequest} req
	 */
	async handle({ data: { barId } }: FrusterRequest<BarDeletedRequest>): Promise<FrusterResponse<BarDeletedResponse>> {
		log.info("Bar deleted listener is called");

		const deletedCount = await this.fooRepo.deleteByQuery({ barId });

		log.info(`${deletedCount} foos deleted by bar id ${barId}`);

		return {
			reqId: "", //TODO
			status: 200,
			data: { deletedCount } //Question - Is need data for listeners
		};
	}

}

export default BarDeletedListener;

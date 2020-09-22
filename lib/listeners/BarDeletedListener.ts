import { FrusterRequest, FrusterResponse } from "fruster-bus";
import FooRepo from "../repos/FooRepo";
const log = require("fruster-log");
import { injectable, inject, subscribe } from "fruster-decorators";
import DeleteFoosByBarIdRequest from "../schemas/DeleteFoosByBarIdRequest";

export const LISTENER_SUBJECT = "pub.bar-service.bar-deleted";

export interface BarDeletedRequest {
	barId: string;
}

export interface BarDeletedResponse {
	deletedCount: number;
}

/**
 * Listener for bar deleted
 */
@injectable()
class BarDeletedListener {

	@inject()
	private fooRepo!: FooRepo;

	/**
	 * Handle listener
	 *
	 * @param {FrusterRequest} req
	 */
	@subscribe({
		subject: LISTENER_SUBJECT,
		requestSchema: DeleteFoosByBarIdRequest,
		docs: { description: "Delete all foos by bar id via listening to bar service" },
		createQueueGroup: false
	})
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

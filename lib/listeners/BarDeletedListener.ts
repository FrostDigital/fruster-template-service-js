import { FrusterRequest, FrusterResponse } from "@fruster/bus";
import { subscribe, injectable, inject } from "@fruster/decorators";
import log from "@fruster/log";

import FooRepo from "../repos/FooRepo";
import BarDeletedRequest from "../schemas/BarDeletedRequest";
import BarDeletedResponse from "../schemas/BarDeletedResponse";

export const LISTENER_SUBJECT = "pub.bar-service.bar-deleted";

/**
 * Listener for bar deleted
 */
@injectable()
class BarDeletedListener {

	@inject()
	private fooRepo!: FooRepo;

	/**
	 * Handle listener
	 */
	@subscribe({
		subject: LISTENER_SUBJECT,
		docs: { description: "Delete all foos by bar id via listening to bar service" },
		createQueueGroup: false
	})
	async handle({ data: { id } }: FrusterRequest<BarDeletedRequest>): Promise<FrusterResponse<BarDeletedResponse>> {
		log.info("Bar deleted listener is called");

		const deletedCount = await this.fooRepo.deleteByQuery({ "bar.id": id });

		log.info(`${deletedCount} foos deleted by bar id ${id}`);

		return {
			status: 200,
			data: { deletedCount } //Question - Is need data for listeners
		};
	}

}

export default BarDeletedListener;

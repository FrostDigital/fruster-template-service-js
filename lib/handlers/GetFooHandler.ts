import { FrusterRequest, FrusterResponse } from "fruster-bus";
import FooManager from "../managers/FooManager";
import FooModel from "../models/FooModel";
import { injectable, inject, subscribe } from "fruster-decorators";
import GetFooRequest from "../schemas/GetFooRequest";
import FooWithBar from "../schemas/FooWithBar";

interface GetFooRequest {
	id: string;
}

export const SERVICE_SUBJECT = "foo-service.get-foo";

/**
 * Handler to get foo by its id.
 */
@injectable()
class GetFooHandler {

	@inject()
	private fooManager!: FooManager;

	/**
	 * Handle service request.
	 */
	@subscribe({
		subject: SERVICE_SUBJECT,
		requestSchema: GetFooRequest,
		responseSchema: FooWithBar,
		permissions: ["foo.get"],
		docs: {
			description: "Returns a foo by its id",
			query: {},
			params: {},
			errors: {
				NOT_FOUND: "Foo was not found",
				INTERNAL_SERVER_ERROR: "Something unexpected happened"
			}
		}
	})
	async handle({ reqId, data: { id } }: FrusterRequest<GetFooRequest>): Promise<FrusterResponse<FooModel>> {
		const foo = await this.fooManager.getFooWithBarById(reqId, id);

		return {
			reqId, // TODO: Fix required in fruster-bus
			status: 200,
			data: foo
		};
	}
}

export default GetFooHandler;

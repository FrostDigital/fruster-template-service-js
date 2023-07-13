import { FrusterRequest, FrusterResponse } from "@fruster/bus";
import { subscribe, injectable, inject } from "@fruster/decorators";

import FooManager from "../managers/FooManager";
import GetFooRequest from "../schemas/GetFooRequest";
import FooWithBar from "../schemas/FooWithBar";
import errors from "../errors";

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
		docs: {
			description: "Returns a foo by its id",
			errors: {
				NOT_FOUND: "Foo was not found",
				INTERNAL_SERVER_ERROR: "Something unexpected happened"
			}
		}
	})
	async handle({ reqId, data: { id } }: FrusterRequest<GetFooRequest>): Promise<FrusterResponse<FooWithBar>> {
		const foo = await this.fooManager.getFooWithBarById(id);

		if (!foo)
			throw errors.notFound(`Foo not found - ${id}`);

		return {
			status: 200,
			data: {
				...foo,
				bar: {
					id: "bar-id",
					name: "bar name"
				}
			}
		};
	}
}

export default GetFooHandler;

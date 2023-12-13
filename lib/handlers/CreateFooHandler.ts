import { FrusterRequest, FrusterResponse } from "@fruster/bus";
import { subscribe, injectable, inject } from "@fruster/decorators";
import log from "@fruster/log";

import FooRepo from "../repos/FooRepo";
import Publishes from "../Publishes";
import FooWithBar from "../schemas/FooWithBar";
import CreateFooRequest from "../schemas/CreateFooRequest";

export const HTTP_SUBJECT = "http.post.foo";
export const PERMISSIONS = ["foo.create"];

/**
 * Handler to create foo.
 */
@injectable()
class CreateFooHandler {

	@inject()
	private fooRepo!: FooRepo

	/**
	 * Handle http request.
	 */
	@subscribe({
		subject: HTTP_SUBJECT,
		permissions: PERMISSIONS,
		docs: {
			description: "Create a foo",
			query: {},
			params: {},
			errors: {
				INTERNAL_SERVER_ERROR: "Something unexpected happened"
			}
		}
	})
	async handleHttp({ reqId, data, user }: FrusterRequest<CreateFooRequest>): Promise<FrusterResponse<FooWithBar>> {
		const foo = await this.fooRepo.create(data, user.id);

		Publishes.fooCreated(reqId, foo.id);
		log.info("Publishes event for foo created");

		log.audit(user.id, `Foo is created - ${foo.id}`); //Log audit need when adding/modifying the db record

		return {
			status: 201,
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

export default CreateFooHandler;

import { FrusterRequest, FrusterResponse } from "fruster-bus";
import * as log from "fruster-log";
import FooRepo from "../repos/FooRepo";
import FooModel from "../models/FooModel";
import Publishes from "../Publishes";
import { subscribe, injectable, inject } from "fruster-decorators";
import FooWithBar from "../schemas/FooWithBar";
import CreateFooRequest from "../schemas/CreateFooRequest";

export const HTTP_SUBJECT = "http.post.foo";

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
		requestSchema: CreateFooRequest,
		responseSchema: FooWithBar,
		permissions: ["foo.create"],
		docs: {
			description: "Create a foo",
			errors: {
				INTERNAL_SERVER_ERROR: "Something unexpected happened"
			}
		}
	})
	async handleHttp({ reqId, data, user }: FrusterRequest<FooModel>): Promise<FrusterResponse<FooModel>> {
		const foo = await this.fooRepo.create(data, user.id);

		Publishes.fooCreated(reqId, foo.id);
		log.info("Publishes event for foo created");

		log.audit(user.id, `Foo is created - ${foo.id}`); //Log audit need when adding/modifying the db record

		return {
			status: 201,
			data: foo
		};
	}
}

export default CreateFooHandler;
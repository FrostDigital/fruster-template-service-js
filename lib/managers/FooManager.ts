import BarServiceClient from "../clients/BarServiceClient";
import FooRepo from "../repos/FooRepo";
import FooModel from "../models/FooModel";
import errors from "../errors";
import { FooWithBar } from "../schemas/FooWithBar";
/**
 * A manager meant to abstract reusable business logic
 * into a nice, friendly API.
 */
class FooManager {

	constructor(private fooRepo: FooRepo) { }

	/**
	 * Gets foo with bar from another service.
	 *
	 * @param {String} reqId the fruster request id
	 * @param {String} id the id of the foo
	 *
	 * @return {Promise<FooWithBar>}
	 */
	async getFooWithBarById(reqId: string, id: string): Promise<FooWithBar> {
		const foo = await this.fooRepo.getById(id) as FooWithBar;

		if (!foo)
			throw errors.notFound(`Foo is not found for id ${id}`);

		if (foo.barId)
			foo.bar = await (await BarServiceClient.getBar(reqId, {barId: foo.barId})).bar;

		return foo;
	}

}

export default FooManager;

import BarServiceClient from "../clients/BarServiceClient";
import FooRepo from "../repos/FooRepo";
import Foo from "../models/Foo";
import errors from "../errors";

/**
 * A manager meant to abstract reusable business logic
 * into a nice, friendly API.
 */
class FooManager {

	constructor(private fooRepo: FooRepo) { }

	/**
	 * Gets foo with bar from another service.
	 */
	async getFooWithBarById(id: string): Promise<Foo> {
		const foo = await this.fooRepo.getById(id);

		if (!foo)
			throw errors.notFound(`Foo is not found for id ${id}`);

		if (foo.bar.id)
			foo.bar = await BarServiceClient.getBar({
				barId: foo.bar.id
			});

		return foo;
	}

}

export default FooManager;

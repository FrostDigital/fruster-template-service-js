const BarServiceClient = require("../clients/BarServiceClient");
const FooRepo = require("../repos/FooRepo");
const FooModel = require("../models/FooModel");

/**
 * A manager meant to abstract reusable business logic
 * into a nice, friendly API.
 */
class FooManager {

	/**
	 * @param {FooRepo} fooRepo
	 */
	constructor(fooRepo) {
		this._repo = fooRepo;
	}

	/**
	 * Gets foo with bar from another service.
	 *
	 * @param {String} reqId the fruster request id
	 * @param {String} id the id of the foo
	 *
	 * @return {Promise<FooModel>}
	 */
	async getFooWithBarById(reqId, id) {
		const foo = await this._repo.getById(id);

		if (!foo)
			return foo;

		const bar = await BarServiceClient.getBar({ reqId, barId: foo.barId });

		foo.bar = bar;

		return new FooModel(foo);
	}

}

module.exports = FooManager;

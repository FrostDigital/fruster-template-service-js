const BarServiceClient = require("../clients/BarServiceClient");
const FooRepo = require("../repos/FooRepo");
const FooModel = require("../models/FooModel");
const errors = require("../errors");

/**
 * A manager meant to abstract reusable business logic
 * into a nice, friendly API.
 */
class FooManager {

	/**
	 * @param {FooRepo} fooRepo
	 */
	constructor(fooRepo) {
		this._fooRepo = fooRepo;
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
		const foo = await this._fooRepo.getById(id);

		if (!foo)
			throw errors.notFound(`Foo is not found for id ${id}`);

		foo.bar = await BarServiceClient.getBar({ reqId, barId: foo.barId });

		return new FooModel(foo);
	}

}

module.exports = FooManager;

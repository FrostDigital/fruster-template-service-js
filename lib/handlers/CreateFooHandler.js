const FrusterRequest = require("fruster-bus").FrusterRequest;
const log = require("fruster-log");
const FooRepo = require("../repos/FooRepo");
const FooModel = require("../models/FooModel");
const Publishes = require("../Publishes");

/**
 * Handler to create foo.
 */
class CreateFooHandler {

	/**
	 * @param {FooRepo} fooRepo
	 */
	constructor(fooRepo) {
		this._repo = fooRepo;
	}

	/**
	 * Handle http request.
	 *
	 * @param {FrusterRequest} req
	 */
	async handleHttp({reqId, data, user}) {
		const foo = await this._repo.create(new FooModel(data, user));

		Publishes.fooCreated(reqId, foo .id);
		log.info("Publishes event for foo created");

		return {
			status: 200,
			data: foo
		};
	}
}

module.exports = CreateFooHandler;

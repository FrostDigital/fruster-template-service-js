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
		this._fooRepo = fooRepo;
	}

	/**
	 * Handle http request.
	 *
	 * @param {FrusterRequest} req
	 */
	async handleHttp({ reqId, data, user }) {
		const foo = await this._fooRepo.create(new FooModel(data, user));

		Publishes.fooCreated(reqId, foo.id);
		log.info("Publishes event for foo created");

		log.audit(user.id, `Foo is created - ${foo.id}`); //Log audit need when adding/modifying the db record

		return {
			status: 201,
			data: foo
		};
	}
}

module.exports = CreateFooHandler;

const FrusterRequest = require("fruster-bus").FrusterRequest;
const FooManager = require("../managers/FooManager");
const errors  = require("../errors");

/**
 * Handler to get foo by its id.
 */
class GetFooHandler {

	/**
	 * @param {FooManager} fooManager
	 */
	constructor(fooManager) {
		this._fooManager = fooManager;
	}

	/**
	 * Handle service request.
	 *
	 * @param {FrusterRequest} req
	 */
	async handle({ reqId, data: { id } }) {
		const foo = await this._fooManager.getFooWithBarById(reqId, id);

		if (!foo)
			throw errors.notFound(`Foo is not found for id ${id}`);

		return {
			status: 200,
			data: foo
		};
	}
}

module.exports = GetFooHandler;

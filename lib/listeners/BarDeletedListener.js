const FrusterRequest = require("fruster-bus").FrusterRequest;
const log = require("fruster-log");
const FooRepo = require("../repos/FooRepo");

/**
 * Listener for bar deleted
 */
class BarDeletedListener {

	/**
	 * @param {FooRepo} fooRepo
	 */
	constructor(fooRepo) {
		this._fooRepo = fooRepo;
	}

	/**
	 * Handle listener
	 *
	 * @param {FrusterRequest} req
	 */
	async handle({ data: { barId } }) {
		log.info("Bar deleted listener is called");

		const deletedCount = await this._fooRepo.deleteByQuery({ barId });

		log.info(`${deletedCount} foos deleted by bar id ${barId}`);

		return {
			status: 200,
			data: { deletedCount } //Question - Is need data for listeners
		};
	}

}

module.exports = BarDeletedListener;

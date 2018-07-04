const bus = require("fruster-bus");
const BarServiceClient = require('../../lib/clients/BarServiceClient');

/** 
 * Mocked version of Bar service, registering subscribes for all of Bar service's endpoints.
 */
class MockBarService {

	constructor() {}

	/** 
	 * Uses static function for ease-of-use.
	 */
	static init() {
		const bar = (barId) => ({
			id: barId,
			bar: "bar"
		});

		bus.subscribe({
			subject: BarServiceClient.endpoints.GET_BAR,
			handle: req => ({
				status: 200,
				data: bar(req.data.barId)
			})
		});
	}

}

module.exports = MockBarService;

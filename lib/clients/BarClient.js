const bus = require("fruster-bus");

class BarClient {

	static get endpoints() {
		return {

			/** Get bar endpoint subject */
			GET_BAR: "bar-service.get-bar"

		};
	}

	/**
	 * Gets bar by id
	 * 
	 * @param {String} reqId request id
	 * @param {String} barId the id of the bar to get
	 */
	static getBar(reqId, barId) {
		const req = {
			reqId,
			data: { barId }
		};

		return bus.request(BarClient.endpoints.GET_BAR, req);
	}

}

module.exports = BarClient;
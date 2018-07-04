const bus = require("fruster-bus");

class BarServiceClient {

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
	static async getBar(reqId, barId) {
		const req = {
			reqId,
			data: {
				barId
			}
		};

		return (await bus.request(BarServiceClient.endpoints.GET_BAR, req)).data;
	}

}

module.exports = BarServiceClient;

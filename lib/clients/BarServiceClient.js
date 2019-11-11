const bus = require("fruster-bus");

/**
 * Note: this service client was generated automatically by api doc @ 2019-11-11T12:04:16.681Z
 */
class BarServiceClient {

	/**
	 * All endpoints
	 */
	static get endpoints() {

		return {

			GET_BAR: "bar-service.get-bar"

		};

	}

	/**
	 * @typedef {Object} GetBarResponse
	 *
	 * @property {String} id
	 * @property {String} bar
	 */


	/**
	 * Gets bar by barId
	 *
	 * @param {Object} param0
	 * @param {String} param0.reqId the request id
	 * @param {String} param0.barId the request id
	 *
	 * @return {Promise<GetBarResponse>}
	 */
	static async getBar({ reqId, barId }) {
		return (await bus.request({
			subject: BarServiceClient.endpoints.GET_BAR,
			message: {
				reqId,
				data: {
					barId
				}
			}
		})).data;
	}

}

module.exports = BarServiceClient;

const bus = require("fruster-bus");

interface GetBarRequest {
	reqId: string;
	barId: string;
}

interface GetBarResponse {
	id: string;
	bar: string;
}

/**
 * Note: this service client for js was generated automatically by api doc @ 2019-11-11T12:04:16.681Z
 */
class BarServiceClient {

	/**
	 * All endpoints
	 */
	static endpoints = {
		GET_BAR: "bar-service.get-bar"
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
	static async getBar({ reqId, barId }: GetBarRequest): Promise<GetBarResponse> {
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

export default BarServiceClient;

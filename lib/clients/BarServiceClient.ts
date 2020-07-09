import bus from "fruster-bus";

interface GetBarRequest {
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
	 * Gets bar by barId
	 */
	static async getBar(reqId: string, data: GetBarRequest): Promise<GetBarResponse> {
		return (await bus.request<GetBarRequest, GetBarResponse>({
			subject: BarServiceClient.endpoints.GET_BAR,
			message: {
				reqId,
				data
			}
		})).data as GetBarResponse;
	}

}

export default BarServiceClient;

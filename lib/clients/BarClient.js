const bus = requires("fruster-bus");

class BarClient {

	getBar(reqId, barId) {
		const req = {
			reqId,
			data: {
				barId
			}
		};

		return bus.request(BarClient.endpoints.GET_BAR, reqId);
	}

}

BarClient.endpoints = {
	GET_BAR: "bar-service.get-bar"
};

module.exports = BarClient;
import constants from "../../lib/constants";
import service from "../../fruster-template-service";

const bus = require("fruster-bus");

export default {

	/**
	 * @param {Function=} afterStart
	 */
	testUtilsOptions: (afterStart: Function) => {
		return {
			mockNats: true,
			bus,
			service,
			afterStart,
			mongoUrl: `mongodb://localhost:27017/${constants.SERVICE_NAME}-test`
		};
	}

};

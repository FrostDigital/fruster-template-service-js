const bus = require("fruster-bus");
import constants from "../../lib/constants";
import { start } from "../../fruster-template-service";

export default {
	testUtilsOptions: (afterStart?: Function) => {
		return {
			mockNats: true,
			bus,
			service: { start },
			afterStart,
			mongoUrl: `mongodb://localhost:27017/${constants.SERVICE_NAME}-test`
		};
	}

};

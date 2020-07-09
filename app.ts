import constants from "./lib/constants";
import config from "./config";
import service from "./fruster-template-service";
const log = require("fruster-log");
require("fruster-health").start();

/**
 * Main entry point for starting the service.
 *
 * Must exit with an exit code greater than 1 in case service
 * could not be started which most commonly happens if it cannot
 * connect to bus or mongo (if mongo is used).
 */
(async function () {
	try {
		await service.start(config.bus, config.mongoUrl);
		log.info(`Successfully started ${constants.SERVICE_NAME}`);
	} catch (err) {
		log.error(`Failed starting ${constants.SERVICE_NAME}`, err);
		process.exit(1);
	}
})();

export default () => { };

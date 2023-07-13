import log from "@fruster/log";
import { start as healthStart } from "@fruster/health";

import constants from "./lib/constants";
import config from "./config";
import { start } from "./fruster-template-service";

/**
 * Main entry point for starting the service.
 *
 * Must exit with an exit code greater than 1 in case service
 * could not be started which most commonly happens if it cannot
 * connect to bus or mongo (if mongo is used).
 */
(async () => {
	try {
		await start(config.bus, config.mongoUrl);
		log.info(`Successfully started ${constants.SERVICE_NAME}`);
		healthStart();
	} catch (err) {
		log.error(`Failed starting ${constants.SERVICE_NAME}`, err);
		process.exit(1);
	}
})();

export default () => { };

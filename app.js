const config = require("./config");
const service = require("./fruster-template-service");
const log = require("fruster-log");
const constants = require('./lib/constants');

/**
 * Main entry point for starting the service.
 * 
 * Must exit with an exit code greater than 1 in case service 
 * could not be started which most commonly happens if it cannot
 * connect to bus or mongo (if mongo is used).
 */
service.start(config.bus, config.mongoUrl)
    .then(() => {
        log.info(`Successfully started ${constants.serviceName}`)
    })
    .catch(err => {
		log.error(`Failed starting ${constants.serviceName}`, err);
		process.exit(1);
	});

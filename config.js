const constants = require("./lib/constants");

/*
	This is where all configuration for service is set.

	Everything here is exposed as environmental variables but with
	developer friendly defaults which basically means that, if running
	locally, the developer could just start with `npm start` and not care
	of any additional configuration.

	Make sure to add comments to explain what the configuration is about.
*/

module.exports = {
	// NATS servers, set multiple if using cluster.
	// Example: `"nats://10.23.45.1:4222,nats://10.23.41.8:4222"`
	bus: process.env.BUS || "nats://localhost:4222",

	// Mongo database URL
	mongoUrl: process.env.MONGO_URL || `mongodb://localhost:27017/${constants.SERVICE_NAME}`
};

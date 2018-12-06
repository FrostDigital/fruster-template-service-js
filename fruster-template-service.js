const bus = require("fruster-bus");
const mongo = require("mongodb");
const Db = mongo.Db;
const constants = require("./lib/constants");
const docs = require("./lib/docs");
const FooRepo = require("./lib/repos/FooRepo");
const FooManager = require('./lib/managers/FooManager');
const GetFooHandler = require("./lib/handlers/GetFooHandler");

const FooWithBarSchema = require("./lib/schemas/FooWithBar");
const GetFooRequestSchema = require("./lib/schemas/GetFooRequest");

module.exports = {
	start: async (busAddress, mongoUrl) => {
		const db = await mongo.connect(mongoUrl);

		await bus.connect(busAddress);
		await registerHandlers(db);
		await createIndexes(db);
	}
};

/**
 * @param {Db} db
 */
function registerHandlers(db) {
	const fooRepo = new FooRepo(db);
	const fooManager = new FooManager(fooRepo);
	const getFooHandler = new GetFooHandler(fooManager);

	// HTTP
	// Add HTTP handlers here

	// SERVICE
	bus.subscribe({
		subject: constants.endpoints.service.GET_FOO,
		requestSchema: GetFooRequestSchema,
		responseSchema: FooWithBarSchema,
		permissions: constants.permissions.GET_FOO,
		docs: docs.service.GET_FOO,
		handle: (req) => getFooHandler.handle(req)
	});

	// Add service handlers here
}

/**
 * @param {Db} db
 */
function createIndexes(db) {
	// Create indexes as needed
	db.collection(constants.collections.FOOS)
		.createIndex({
			id: 1
		});
}

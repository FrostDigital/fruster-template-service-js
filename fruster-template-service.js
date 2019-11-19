const bus = require("fruster-bus");
const mongo = require("mongodb");
const Db = mongo.Db;
const constants = require("./lib/constants");
const docs = require("./lib/docs");
const FooRepo = require("./lib/repos/FooRepo");
const FooManager = require("./lib/managers/FooManager");
const GetFooHandler = require("./lib/handlers/GetFooHandler");
const CreateFooHandler = require("./lib/handlers/CreateFooHandler");
const BarDeletedListener = require("./lib/listeners/BarDeletedListener");

const FooWithBarSchema = require("./lib/schemas/FooWithBar");
const GetFooRequestSchema = require("./lib/schemas/GetFooRequest");
const CreateFooRequestSchema = require("./lib/schemas/CreateFooRequest");
const DeleteFoosByBarIdRequest = require("./lib/schemas/DeleteFoosByBarIdRequest");

module.exports = {
	start: async (busAddress, mongoUrl) => {
		const db = await mongo.connect(mongoUrl);

		await bus.connect(busAddress);
		registerHandlers(db);

		if (!process.env.CI)
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
	const createFooHandler = new CreateFooHandler(fooRepo);
	const barDeletedListener = new BarDeletedListener(fooRepo);

	// HTTP
	// Add http handlers here
	bus.subscribe({
		subject: constants.endpoints.http.CREATE_FOO,
		requestSchema: CreateFooRequestSchema,
		responseSchema: FooWithBarSchema,
		permissions: constants.permissions.CREATE_FOO,
		docs: docs.http.CREATE_FOO,
		handle: (req) => createFooHandler.handleHttp(req)
	});

	// SERVICE
	// Add service handlers here
	bus.subscribe({
		subject: constants.endpoints.service.GET_FOO,
		requestSchema: GetFooRequestSchema,
		responseSchema: FooWithBarSchema,
		permissions: constants.permissions.GET_FOO,
		docs: docs.service.GET_FOO,
		handle: (req) => getFooHandler.handle(req)
	});

	// LISTENERS
	// Add listeners here
	bus.subscribe({
		subject: constants.endpoints.listener.BAR_DELETED,
		requestSchema: DeleteFoosByBarIdRequest,
		docs: docs.listener.BAR_DELETED,
		createQueueGroup: false,
		handle: (req) => barDeletedListener.handle(req)
	});
}

/**
 * @param {Db} db
 */
async function createIndexes(db) {
	// Create indexes as needed
	await db.collection(constants.collections.FOOS).createIndex({ id: 1 });
}

import bus from "fruster-bus";
import { connect, Db } from "mongodb";
import constants from "./lib/constants";
import docs from "./lib/docs";
import FooRepo from "./lib/repos/FooRepo";
import FooManager from "./lib/managers/FooManager";
import GetFooHandler from "./lib/handlers/GetFooHandler";
import CreateFooHandler from "./lib/handlers/CreateFooHandler";
import BarDeletedListener from "./lib/listeners/BarDeletedListener";
import CreateFooRequest from "./lib/schemas/CreateFooRequest";
import FooWithBar from "./lib/schemas/FooWithBar";
import GetFooRequest from "./lib/schemas/GetFooRequest";
import DeleteFoosByBarIdRequest from "./lib/schemas/DeleteFoosByBarIdRequest";

export const start = async (busAddress: string, mongoUrl: string) => {
	const db = await connect(mongoUrl);

	await bus.connect(busAddress);
	registerHandlers(db);

	if (!process.env.CI)
		await createIndexes(db);
};

function registerHandlers(db: Db) {
	const fooRepo = new FooRepo(db);
	const fooManager = new FooManager(fooRepo);
	const getFooHandler = new GetFooHandler(fooManager);
	const createFooHandler = new CreateFooHandler(fooRepo);
	const barDeletedListener = new BarDeletedListener(fooRepo);

	// HTTP
	// Add http handlers here
	bus.subscribe({
		subject: constants.endpoints.http.CREATE_FOO,
		requestSchema: CreateFooRequest,
		responseSchema: FooWithBar,
		permissions: constants.permissions.CREATE_FOO,
		docs: docs.http.CREATE_FOO,
		handle: (req: any): any => createFooHandler.handleHttp(req)
	});

	// SERVICE
	// Add service handlers here
	bus.subscribe({
		subject: constants.endpoints.service.GET_FOO,
		requestSchema: GetFooRequest,
		responseSchema: FooWithBar,
		permissions: constants.permissions.GET_FOO,
		docs: docs.service.GET_FOO,
		handle: (req: any): any => getFooHandler.handle(req)
	});

	// LISTENERS
	// Add listeners here
	bus.subscribe({
		subject: constants.endpoints.listener.BAR_DELETED,
		requestSchema: DeleteFoosByBarIdRequest,
		docs: docs.listener.BAR_DELETED,
		createQueueGroup: false,
		handle: (req: any): any => barDeletedListener.handle(req)
	});
}

async function createIndexes(db: Db) {
	// Create indexes as needed
	await db.collection(constants.collections.FOOS).createIndex({ id: 1 });
}

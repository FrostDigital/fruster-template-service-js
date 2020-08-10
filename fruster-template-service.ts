const bus = require("fruster-bus");
import { connect, Db } from "mongodb";
import constants from "./lib/constants";
import FooRepo from "./lib/repos/FooRepo";
import FooManager from "./lib/managers/FooManager";
import GetFooHandler from "./lib/handlers/GetFooHandler";
import CreateFooHandler from "./lib/handlers/CreateFooHandler";
import BarDeletedListener from "./lib/listeners/BarDeletedListener";
import { injections } from "fruster-decorators";

export const start = async (busAddress: string, mongoUrl: string) => {
	const db = await connect(mongoUrl);

	await bus.connect(busAddress);

	registerHandlers(db);

	if (!process.env.CI)
		await createIndexes(db);
};

function registerHandlers(db: Db) {
	injections({ fooRepo: new FooRepo(db) });
	injections({ fooManager: new FooManager() });

	/**
	 * Http handlers
	 * Add http handlers here
	*/
	new CreateFooHandler();

	/**
	 * Service handlers
	 * Add service handlers here
	*/
	new GetFooHandler();

	/**
	 * Listeners
	 * Add listeners here
	 */
	new BarDeletedListener();
}

async function createIndexes(db: Db) {
	// Create indexes as needed
	await db.collection(constants.collections.FOOS).createIndex({ id: 1 });
}

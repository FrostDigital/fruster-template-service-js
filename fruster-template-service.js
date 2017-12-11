const bus = require("fruster-bus");
const log = require("fruster-log");
const mongo = require("mongodb");
const config = require("./config");
const constants = require("./lib/constants");
const docs = require("./lib/docs");
const FooRepo = require("./lib/repos/FooRepo");
const GetFooHandler = require("./lib/handlers/GetFooHandler");

module.exports = {
    start: async (busAddress, mongoUrl) => {
        const db = await mongo.connect(mongoUrl);

        await bus.connect(busAddress);
        await registerHandlers(db);
        await createIndexes(db);
    }
};

function registerHandlers(db) {
    const fooRepo = new FooRepo(db);
    const getFooHandler = new GetFooHandler(fooRepo);

    // HTTP     
    // Add HTTP handlers here

    // SERVICE
    bus.subscribe({
        subject: constants.endpoints.service.GET_FOO,
        responseSchema: "GetFooResponse",
        requestSchema: "GetFooRequest",
        docs: docs.service.GET_FOO,
        handle: (req) => getFooHandler.handle(req)
    })

    // Add service handlers here
}


function createIndexes(db) {
    // TODO
}

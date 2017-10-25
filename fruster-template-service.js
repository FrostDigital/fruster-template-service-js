const bus = require("fruster-bus");
const log = require("fruster-log");
const mongo = require("mongodb");
const config = require("./config");
const constants = require("./lib/constants.js");
const FooRepo = require("./lib/repos/FooRepo");

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

    // HTTP 
    
    // TODO
    
    // SERVICE
    
    // TODO
}  


function createIndexes(db) {    
    // TODO
}
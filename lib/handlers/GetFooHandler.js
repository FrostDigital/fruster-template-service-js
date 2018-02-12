const FrusterRequest = require("fruster-bus").FrusterRequest;
const FooRepo = require("../repos/FooRepo");
const errors = require("../errors");
const FooManager = require('../managers/FooManager');


/**
 * Handler to get foo by its id.
 */
class GetFooHandler {

    /**
     * 
     * @param {FooManager} fooManager 
     */
    constructor(fooManager) {
        this._fooManager = fooManager;
    }

    /**
     * Handle service request.
     * 
     * @param {FrusterRequest} req
     */
    async handle(req) {
        const foo = await this._fooManager.getFooWithBarById(req.reqId, req.data.id);

        return {
            status: 200,
            data: foo
        };
    }
}

module.exports = GetFooHandler;

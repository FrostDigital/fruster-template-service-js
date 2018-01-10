const FrusterRequest = require("fruster-bus").FrusterRequest;
const FooRepo = require("../repos/FooRepo");
const errors = require("../errors");

/**
 * Handler to get foo by its id.
 */
class GetFooHandler {

    /**
     * 
     * @param {FooRepo} fooRepo 
     */
    constructor(fooRepo)  {
        this.fooRepo = fooRepo;
    }

    /**
     * Handle service request.
     * 
     * @param {FrusterRequest} req
     */
    async handle(req) {
        return {
            status: 200,
            data: await this._getFoo(req.data.id)
        };
    }

    async _getFoo(id) {
        return await this.fooRepo.getById(id);
    }
}

module.exports = GetFooHandler;
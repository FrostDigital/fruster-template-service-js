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
    constructor(fooRepo) {
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
        const foo = await this.fooRepo.getById(id);

        if (!foo) {
            throw errors.notFound(`Foo ${id} not found`);
        }

        return foo;
    }
}

module.exports = GetFooHandler;
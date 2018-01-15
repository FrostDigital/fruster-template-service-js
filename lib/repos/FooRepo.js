const uuid = require("uuid");
const log = require("fruster-log");

const constants = require("../constants");
const errors = require("../errors");

const CreateFooRequestModel = require("../models/CreateFooRequestModel");
const CreateFooResponseModel = require("../models/CreateFooResponseModel");
const UpdateFooRequestModel = require("../models/UpdateFooRequestModel");
const UpdateFooResponseModel = require("../models/UpdateFooResponseModel");
const GetFooResponseModel = require("../models/GetFooResponseModel");

/**
 * A repository meant to abstract mongo queries and write operation
 * into a nice, friendly API. Create one repository per collection.
 * 
 * Avoid placing business logic or anything related to bus messages in here.
 * 
 * Note that we generally do not want to exposes the _id which is 
 * created by mongo, hence the `{_id: 0}` to filter it out in queries and
 * `delete foo_id` in create.
 */
class FooRepo {

    /**
     * @param {Object} db 
     */
    constructor(db) {
        this.collection = db.collection(constants.collections.FOOS);
    }

    /**
     * Get Foo by id.
     * 
     * @param {String} id 
     * 
     * @returns {Promise<GetFooResponseModel>} Foo 
     */
    async getById(id) {
        try {
            const foo = await this.collection.findOne({
                id: id
            });

            if (!foo) {
                throw errors.notFound();
            }

            return new GetFooResponseModel(foo);
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Find all Foo's. 
     * @returns {Promise<Object>} promise 
     */
    async findAll() {
        try {
            return this.collection.find({}, {
                _id: 0
            }).toArray();
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Creates a new foo.
     * 
     * @param {CreateFooRequestModel} foo 
     * @returns {Promise<CreateFooResponseModel>} created foo
     */
    async create(foo) {
        try {
            const result = await this.collection.insert(foo);

            return new CreateFooResponseModel(result.ops[0]);
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Updates Foo.
     * 
     * @param  {String} fooId
     * @param  {UpdateFooRequestModel} changes 
     * 
     * @return {Promise<UpdateFooResponseModel>} updated foo
     */
    async update(fooId, changes) {
        try {
            await this.collection.updateOne({
                id: fooId
            }, {
                $set: changes
            });

            const foo = await this.getById(fooId);

            return new UpdateFooResponseModel(foo);
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * @param {Object} error 
     */
    _handleError(error) {
        log.error(error);

        if (!error.status)
            throw errors.internalServerError();

        throw error;
    }
}

module.exports = FooRepo;
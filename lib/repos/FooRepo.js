const constants = require("../constants");
const uuid = require("uuid");

/**
 * A repository meant to abstract mongo queries and write operation
 * into a nice, friendly API. Create one repository per collection.
 * 
 * Avoid placing business logic or anything related to bus messages in here.
 * 
 * Note that we generally do not want to exposes the _id which is 
 * created by mongo, hence the `{_id: 0}` to filter it out in queries.
 */
class FooRepo {

    constructor(db) {
        this.collection = db.getCollection(constants.collections.foos);        
    }

    /**
     * Get Foo by id.
     * 
     * @param {String} id 
     * @returns {Promise<Object>} promise 
     */
    getById(id) {
        return this.collection.findOne({id: id}, {_id: 0});
    }
    
    /**
     * Find all Foo's. 
     * @returns {Promise<Object>} promise 
     */
    findAll() {
        return this.collection.find({}, {_id: 0}).toArray();
    }
    
    /**
     * Creates a new foo.
     * 
     * @param {*} foo 
     * @returns {Promise<Object>} promise 
     */
    async create(foo) {
        // TODO: Is is really necessary to get res.ops[0] from insert result or can we just return object directly like this?
        foo.id = uuid.v4();        
        await this.collection.insert(foo);        
        return foo;        
    }

    /**
     * Updates Foo.
     * 
     * @param  {String} fooId
     * @param  {Object} changes 
     * @return {Promise<Object>} updated foo
     */
    async update(fooId, changes) {        
        await this.collection.updateOne({id: fooId}, {$set: changes});
        return this.getById(fooId);
    }
}

module.exports = FooRepo;
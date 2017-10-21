const constants = require("../constants");
const uuid = require("uuid");

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
        this.collection = db.collection(constants.collections.foos);        
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
     * @param {Object} foo 
     * @returns {Promise<Object>} created foo
     */
    async create(foo) {        
        foo.id = uuid.v4();        
        await this.collection.insert(foo);
        delete foo._id;
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
const uuid = require("uuid");

class CreateFooRequestModel {

    /**
     * @typedef {Object} input
     * 
     * @property {String} name //Mandatory property
     * @property {String=} description //Optional property
     */

    /**
     * @typedef {Object} user
     * 
     * @property {Number} id  
     */

    /**
     * @param {Object} input
     * @param {Object} user
     */
    constructor(input, user) {
        this.id = uuid.v4();
        this.name = input.name;
        this.description = input.description || null;
        this.created = new Date();
        this.createdBy = user.id;
    }
}

module.exports = CreateFooRequestModel;
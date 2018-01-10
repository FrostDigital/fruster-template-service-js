const uuid = require("uuid");

class CreateFooResponseModel {

    /**
     * @param {Object} json
     * @param {String} json.id
     * @param {String} json.name 
     * @param {String} json.description 
     * @param {String} json.created 
     * @param {String} json.createdBy 
     */
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.description = json.description;
        this.created = json.created;
        this.createdBy = {
            id: json.createdBy
        };
    }
}

module.exports = CreateFooResponseModel;
class GetFooResponseModel {

    /**
     * @param {Object} json
     * @param {String} json.id
     * @param {String} json.name 
     * @param {String} json.description 
     * @param {String} json.createdBy 
     */
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.description = json.description;
        this.created = new Date();
        this.createdBy = {
            id: json.createdBy
        };
    }
}

module.exports = GetFooResponseModel;
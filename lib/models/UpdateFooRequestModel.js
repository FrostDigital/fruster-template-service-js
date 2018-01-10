class UpdateFooRequestModel {

    /**
     * @param {Object} input
     * @param {String=} input.name
     * @param {String=} input.description 
     */
    constructor(input) {
        if (input.name)
            this.name = input.name;

        if (input.description)
            this.description = input.description;

        this.updated = new Date();
    }
}

module.exports = UpdateFooRequestModel;
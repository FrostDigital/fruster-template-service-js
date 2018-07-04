const uuid = require("uuid");

class FooModel {

	/**
	 * @typedef {Object} Input
	 * @property {String=} id // Optional property
	 * @property {String} name // Mandatory property
	 * @property {String=} description
	 * @property {Date=} created 
	 * @property {Date=} updated 
	 * @property {String=} createdBy 
	 * @property {String=} barId 
	 * @property {Object=} bar
	 */

	/**
	 * @typedef {Object} User
	 * @property {String} id  
	 */

	/**
	 * @param {Input} input
	 * @param {User=} user
	 */
	constructor(input, user) {
		this.id = input.id || uuid.v4();
		this.name = input.name;
		this.description = input.description;
		this.created = input.created || new Date();
		this.updated = input.updated;
		this.createdBy = input.createdBy || user.id;
		this.barId = input.barId;
		this.bar = input.bar;
	}

}

module.exports = FooModel;

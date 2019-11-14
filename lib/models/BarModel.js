const uuid = require("uuid");

class BarModel {

	/**
	 * @typedef {Object} Input
	 * @property {String=} id // Optional property
	 * @property {String} name // Mandatory property
	 */

	/**
	 * @param {Input} input
	 */
	constructor(input) {
		this.id = input.id || uuid.v4();
		this.name = input.name;
	}

}

module.exports = BarModel;

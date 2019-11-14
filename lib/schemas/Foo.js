const User = require("./User");

const nullableString = ["string", "null"];

module.exports = {
	id: "Foo",
	description: "Foo is an example object",
	type: "object",
	properties: {
		id: {
			type: "string",
			format: "uuid",
			description: "Readonly unique id, is set during creation"
		},
		name: {
			type: "string",
			description: "Name of Foo"
		},
		description: {
			type: nullableString,
			description: "Description of Foo"
		},
		barId: {
			type: "string",
			format: "uuid",
			description: "Bar id"
		},
		created: {
			type: nullableString,
			format: "date-time",
			description: "The organisation created time"
		},
		updated: {
			type: nullableString,
			format: "date-time",
			description: "The organisation last updated time"
		},
		createdBy: {
			...User.properties.id,
			description: "The organisation created user"
		}
	}
};

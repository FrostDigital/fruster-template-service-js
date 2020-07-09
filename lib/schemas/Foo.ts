import User from "./User";

const nullableString = ["string", "null"];

export default {
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
		created: {
			type: nullableString,
			format: "date-time",
			description: "The organization created time"
		},
		updated: {
			type: nullableString,
			format: "date-time",
			description: "The organization last updated time"
		},
		createdBy: {
			...User.properties.id,
			description: "The organization created user"
		}
	}
};

const Foo = require("./Foo");

module.exports = {
	id: "GetFooRequest",
	description: "Request to get a Foo by its id",
	type: "object",
	additionalProperties: false,
	properties: {
		id: { ...Foo.properties.id }
	},
	required: [
		"id"
	]
}

const Foo = require("./Foo");

module.exports = {
	id: "CreateFooRequest",
	description: "Foo with bar",
	properties: {
		name: {
			...Foo.properties.name
		},
		description: {
			...Foo.properties.description
		}
	},
	required: [
		"name",
		"description"
	]
};

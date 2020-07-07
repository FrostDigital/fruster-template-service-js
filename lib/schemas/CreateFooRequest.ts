import Foo from "./Foo";

export default {
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

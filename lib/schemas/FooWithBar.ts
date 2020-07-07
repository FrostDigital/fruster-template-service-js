import Foo from "./Foo";

export default {
	id: "FooWithBar",
	description: "Foo with bar",
	properties: {
		id: {
			...Foo.properties.id
		},
		name: {
			...Foo.properties.name
		},
		description: {
			...Foo.properties.description
		},
		created: {
			...Foo.properties.created
		},
		updated: {
			...Foo.properties.updated
		},
		createdBy: {
			...Foo.properties.createdBy
		},
		bar: {
			description: "bar",
			properties: {
				bar: { type: "string" }
			}
		}
	},
	required: [
		"id",
		"name",
		"description",
		"created",
		"createdBy",
		"bar"
	]
};

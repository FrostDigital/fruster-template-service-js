module.exports = {
	id: "User",
	description: "User object",
	type: "object",
	properties: {
		id: {
			type: "string",
			format: "uuid",
			description: "Readonly unique id, is set during creation"
		}
	}
};

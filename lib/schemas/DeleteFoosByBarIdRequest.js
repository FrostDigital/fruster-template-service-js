module.exports = {
	id: "DeleteFoosByBarIdRequest",
	type: "object",
	description: "Request for delete foos by bar id",
	additionalProperties: false,
	properties: {
		barId: {
			type: "string",
			format: "uuid",
			description: "Bar id"
		}
	},
	required: ["barId"]
};

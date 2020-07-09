/*
	This is the place to define custom errors this service may throw in addition
	to default ones (BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, FORBIDDEN, INTERNAL_SERVER_ERROR).
	If error reaches API Gateway it will use `status` as HTTP status code.
*/
const serviceSpecificErrors = [{
	status: 400,
	code: "EXAMPLE_CUSTOM_ERROR",
	title: "This is an example error"
}];

export default require("fruster-errors")(serviceSpecificErrors);

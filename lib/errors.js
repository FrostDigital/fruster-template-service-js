const constants = require("./constants.js");

/*
    This is the place to define errors this service may throw.
    If error reaches API Gateway it will use `status` as HTTP status code.
*/
const errors = [
    { status: 500, code: "INTERNAL_SERVER_ERROR", title: "Internal server error", detail: (detail) => { return detail; } },
    { status: 400, code: "BAD_REQUEST", title: "Request has invalid or missing fields" },
    { status: 401, code: "UNAUTHORIZED", title: "Unauthorized" },
    { status: 404, code: "NOT_FOUND", title: "Resource does not exist" }
];

module.exports = require("fruster-errors")(constants.SERVICE_NAME, errors);
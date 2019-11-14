module.exports = {

    /**
     * This is the place to write documentation for endpoints.
     * Each endpoint can have a description, url parameters (params), query parameters (query) and errors documented.
     * params, query & error object are defined like <param, description>, <query, description>, <errorCode, description>.
     * Further documentation is generated automatically.
     */
    http: {

        // Add http documentation here, for example:
        CREATE_FOO: {
            description: "Create a foo",
            errors: {
                INTERNAL_SERVER_ERROR: "Something unexpected happened"
            }
        }

    },

    service: {

        // Add internal service documentation here, for example:
        GET_FOO: {
            description: "Returns a foo by its id",
            query: {},
            params: {},
            errors: {
                NOT_FOUND: "Foo was not found",
                INTERNAL_SERVER_ERROR: "Something unexpected happened"
            }
        }

	},

	listener: {

		// Add listner documentation here, for example:
        BAR_DELETED: {
			description: "Delete all foos by bar id via listening to bar service"
		}
	},

    ws: {
        // Add ws (websocket) documentation here, however, typically ws endpoints use the same code as http.
    },


    deprecated: {

        // Add deprecated services
        GET_FOO: "Use some.example.service instead."

    },

};

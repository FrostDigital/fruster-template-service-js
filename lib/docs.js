module.exports = {

    /**
     * This is the place to write documentation for endpoints. 
     * Each endpoint can have a description, url parameters (params), query parameters (query) and errors documented. 
     * params, query & error object are defined like <param, description>, <query, description>, <errorCode, description>.
     * Further documentation is generated automatically.
     */
    http: {
        // Add http documentation here, for example:
        GET_FOO: {
            description: "Returns a foo by its id",
            query: {
                filter: "Example of query param description"
            },
            params: {
                fooId: "Id of the foo to get"
            },
            errors: {
                NOT_FOUND: "Foo was not found",
                INTERNAL_SERVER_ERROR: "Something unexpected happened"
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

        ws: {
            // Add internal service documentation here, however, typically ws endpoints use the same code as http.
        }

    }

};
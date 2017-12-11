module.exports = {

    service: {

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

    http: {

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
        }


    }

};
module.exports = {

    // Name of this service, used in various places
    SERVICE_NAME: "fruster-template-service",

    endpoints: {

        http: {
            // Add http endpoints here, for example:
            GET_FOO: "http.get.foo.:fooId"
        },

        service: {
            // Add internal service endpoints here, for example:
            GET_FOO: "foo-service.get-foo"
        }

    },

    collections: {

        // Name(s) of mongo collections
        FOOS: "foos"

    }

};
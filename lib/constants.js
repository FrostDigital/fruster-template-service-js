module.exports = {
    
    // Name of this service, used in various places
    serviceName: "fruster-template-service",
    
    endpoints: {
        http: {
            // Add http endpoints here, for example:
            getFoo: "http.get.foo.:fooId"
        },

        service: {
            // Add internal service endpoints here, for example:
            getFoo: "foo-service.get-foo"
        }
    },

    collections: {
        // Name(s) of mongo collections
        foos: "foos"
    }

};
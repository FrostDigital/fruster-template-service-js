module.exports = {

	// Name of this service, used in various places
	SERVICE_NAME: "fruster-template-service",

	endpoints: {

		http: {

			// Add http endpoints here, for example:
			CREATE_FOO: "http.post.foo"

		},

		service: {

			// Add internal service endpoints here, for example:
			GET_FOO: "foo-service.get-foo"

		},

		listener: {

			// Add listeners here, for example:
			BAR_DELETED: "pub.bar-service.bar-deleted"
		}

	},

	collections: {

		// Name(s) of mongo collections
		FOOS: "foos"

	},

	permissions: {

		// Permissions for requests
		GET_FOO: ["foo.get"], //Use resource name (foo) first, action (get, create, update, delete) after that.
		CREATE_FOO: ["foo.create"]

	}

};

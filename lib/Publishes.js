const bus = require("fruster-bus");

class Publishes {

	static get subjects() {

		return {
			FOO_CREATED: "pub.foo-service.foo-created"
		};

	}

	/**
	 * Publish foo created event
	 *
	 * @param {String} reqId
	 * @param {String} fooId
	 */
	static fooCreated(reqId, fooId) {
		bus.publish(Publishes.subjects.FOO_CREATED, { reqId, data: { fooId } });
	}

}

module.exports = Publishes;

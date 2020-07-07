const bus = require("fruster-bus");

class Publishes {

	static subjects = {
		FOO_CREATED: "pub.foo-service.foo-created"
	}

	/**
	 * Publish foo created event
	 *
	 * @param {String} reqId
	 * @param {String} fooId
	 */
	static fooCreated(reqId: string, fooId: string) {
		bus.publish(Publishes.subjects.FOO_CREATED, { reqId, data: { fooId } });
	}

}

export default Publishes;

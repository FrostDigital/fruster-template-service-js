import bus from "@fruster/bus";

class Publishes {

	static subjects = {
		FOO_CREATED: "pub.foo-service.foo-created"
	}

	/**
	 * Publish foo created event
	 */
	static fooCreated(reqId: string, fooId: string) {
		bus.publish({
			subject: Publishes.subjects.FOO_CREATED,
			message: { data: { fooId } }
		});
	}

}

export default Publishes;

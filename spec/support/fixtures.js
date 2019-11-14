class Fixtures {

	get foo() {

		return {
			id: "a0eee7de-ebb2-4ba9-b06a-572aa6673178",
			name: "foo"
		};

	}

	get createFooRequest(){

		return {
			name: "foo",
			description: "foo description",
			bar: "bar"
		};

	}

	get user() {

		return {
			id: "7680e430-97b8-4fff-96f6-863312008cb0",
			name: "Dinuka Thilanga",
			scopes: ["foo.get"]
		};

	}

}

module.exports = new Fixtures();

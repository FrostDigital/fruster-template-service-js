class Fixtures {

	foo = {
		id: "a0eee7de-ebb2-4ba9-b06a-572aa6673178",
		name: "foo"
	};

	createFooRequest = {
		name: "foo",
		description: "foo description",
		bar: "bar"
	}

	user = {
		id: "7680e430-97b8-4fff-96f6-863312008cb0",
		name: "Dinuka Thilanga",
		scopes: ["foo.get"]
	}

}

export default new Fixtures();

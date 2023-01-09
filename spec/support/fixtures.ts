import FooModel from "../../lib/models/FooModel";
import { Foo } from "../../lib/schemas/Foo";

class Fixtures {

	user = {
		id: "7680e430-97b8-4fff-96f6-863312008cb0",
		name: "Dinuka Thilanga",
		scopes: ["foo.get"]
	}

	foo: FooModel = {
		id: "a0eee7de-ebb2-4ba9-b06a-572aa6673178",
		name: "foo",
		description: "description",
		metadata: {
			created: new Date(),
			createdBy: this.user.id
		}
	};

	createFooRequest = {
		name: "foo",
		description: "foo description",
		barId: "078962e6-bec0-460d-b33a-263e5a82cb67"
	}

}

export default new Fixtures();

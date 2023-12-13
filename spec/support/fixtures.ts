import { User } from "@fruster/bus";
import Foo from "../../lib/models/Foo";
import CreateFooRequest from "../../lib/schemas/CreateFooRequest";

class Fixtures {
	user: User = {
		id: "7680e430-97b8-4fff-96f6-863312008cb0",
		name: "Dinuka Thilanga",
		scopes: ["foo.get"]
	}

	foo: Foo = {
		id: "a0eee7de-ebb2-4ba9-b06a-572aa6673178",
		name: "foo",
		bar: { id: "0617441e-3d7d-4675-82fb-d7867002be66" },
		created: new Date("2023-01-01"),
		createdBy: {
			id: this.user.id
		}
	};

	createFooRequest: CreateFooRequest = {
		name: "foo",
		description: "foo description"
	}

}

export default new Fixtures();

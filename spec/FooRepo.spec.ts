import { Db } from "mongodb";
import { User } from "@fruster/bus";
import frusterTestUtils from "@fruster/test-utils";

import FooRepo from "../lib/repos/FooRepo";
import FooModel from "../lib/models/Foo";

import fixtures from "./support/fixtures";
import specConstants from "./support/spec-constants";

describe("FooRepo", () => {

	let repo: FooRepo;

	let db: Db;

	frusterTestUtils
		.startBeforeEach(specConstants
			.testUtilsOptions(async (connection: any) => {
				db = connection.db;
				repo = new FooRepo(connection.db);
			}));

	it("should create Foo", async () => {
		const createdFoo = await createFoo(fixtures.foo, fixtures.user);

		expect(createdFoo.id).toBeDefined();
		//@ts-ignore
		expect(createdFoo._id).toBeUndefined();
		expect(createdFoo.name).toBe(fixtures.foo.name);
	});

	it("should get Foo by id", async () => {
		const foo = await createFoo(fixtures.foo, fixtures.user);

		const retrievedFoo = await repo.getById(foo.id);

		expect(retrievedFoo).toBeDefined("should have gotten foo by id");
	});

	it("should get throw exception with 404 if Foo does not exist", async () => {
		const retrievedFoo = await repo.getById("fake-id");

		expect(retrievedFoo).toBe(null);
	});

	it("should update Foo details", async () => {
		const foo = await createFoo(fixtures.foo, fixtures.user);

		const updatedFoo = await repo.update(foo.id, {
			description: "test description"
		});

		expect(updatedFoo?.description).toBe("test description");
	});

	it("should find all foos", async () => {
		const { id, ...foo } = fixtures.foo;

		await createFoo(foo, fixtures.user);
		await createFoo(foo, fixtures.user);

		const foos = await repo.findAll();

		expect(foos.length).toBe(2);
	});

	const createFoo = async (foo: Partial<FooModel>, user: User) => {
		return await repo.create(foo, user.id);
	}

});


// TODO: Add example of extending fixtures

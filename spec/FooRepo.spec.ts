import { Db } from "mongodb";
import FooRepo from "../lib/repos/FooRepo";
import FooModel from "../lib/models/FooModel";
import fixtures from "./support/fixtures";
import specConstants from "./support/spec-constants";

const frusterTestUtils = require("fruster-test-utils");

describe("FooRepo", () => {

	let repo: FooRepo;

	let db: Db;

	frusterTestUtils
		.startBeforeEach(specConstants
			.testUtilsOptions(async (connection: any) => {
				db = connection.db;
				repo = new FooRepo(connection.db);
			}));

	it("should create Foo", async done => {
		const createdFoo = await createFoo(fixtures.foo, fixtures.user);

		expect(createdFoo.id).toBeDefined("should have created id");
		//@ts-ignore
		expect(createdFoo._id).toBeUndefined("should not leak _id");
		expect(createdFoo.name).toBe(fixtures.foo.name);

		done();
	});

	it("should get Foo by id", async done => {
		const foo = await createFoo(fixtures.foo, fixtures.user);

		const retrievedFoo = await repo.getById(foo.id);

		expect(retrievedFoo).toBeDefined("should have gotten foo by id");

		done();
	});

	it("should get throw exception with 404 if Foo does not exist", async () => {
		const retrievedFoo = await repo.getById("fake-id");

		expect(retrievedFoo).toBe(null);
	});

	it("should update Foo details", async done => {
		const foo = await createFoo(fixtures.foo, fixtures.user);

		const updatedFoo = await repo.update(foo.id, {
			description: "test description"
		});

		expect(updatedFoo?.description).toBe("test description");

		done();
	});

	it("should find all foos", async done => {
		const foo = fixtures.foo;
		delete foo.id;

		await createFoo(foo, fixtures.user);
		await createFoo(foo, fixtures.user);

		const foos = await repo.findAll();

		expect(foos.length).toBe(2);

		done();
	});

	async function createFoo(foo: FooModel, user: any) {
		return await repo.create(foo, user.id);
	}

});


// TODO: Add example of extending fixtures

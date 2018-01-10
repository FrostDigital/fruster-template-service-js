const testUtils = require("fruster-test-utils");
const FooRepo = require("../lib/repos/FooRepo");
const constants = require("../lib/constants");
const fixtures = require("./support/fixtures");
const errors = require("../lib/errors");

const CreateFooRequestModel = require("../lib/models/CreateFooRequestModel");
const CreateFooResponseModel = require("../lib/models/CreateFooResponseModel");
const UpdateFooRequestModel = require("../lib/models/UpdateFooRequestModel");
const UpdateFooResponseModel = require("../lib/models/UpdateFooResponseModel");
const GetFooResponseModel = require("../lib/models/GetFooResponseModel");

describe("FooRepo", () => {

	/** @type {FooRepo} */
	let repo;

	testUtils.startBeforeEach({
		mockNats: true,
		mongoUrl: "mongodb://localhost:27017/fruster-template-service-test",
		afterStart: (connection) => repo = new FooRepo(connection.db)
	});

	it("should create Foo", async done => {
		let fooToCreate = new CreateFooRequestModel(fixtures.foo, fixtures.user);

		const createdFoo = await repo.create(fooToCreate);

		expect(createdFoo).toEqual(jasmine.any(CreateFooResponseModel));
		expect(createdFoo.id).toBeDefined("should have created id");
		expect(createdFoo._id).toBeUndefined("should not leak _id");
		expect(createdFoo.name).toBe(fooToCreate.name);

		done();
	});

	it("should get Foo by id", async done => {
		let fooToCreate = new CreateFooRequestModel(fixtures.foo, fixtures.user);

		const foo = await repo.create(fooToCreate);

		const retrievedFoo = await repo.getById(foo.id);

		expect(retrievedFoo).toEqual(jasmine.any(GetFooResponseModel));
		expect(retrievedFoo).toBeDefined("should have gotten foo by id");
		expect(retrievedFoo._id).toBeUndefined("should not leak _id");

		done();
	});

	it("should get throw exception with 404 if Foo does not exist", async done => {
		try {
			const retrievedFoo = await repo.getById("fake-id");

			expect(retrievedFoo).toBe(null);

			done();
		} catch (err) {
			expect(err.status).toBe(404);
			expect(err.error.code).toBe(errors.notFound().error.code);
			done();
		}
	});

	it("should update Foo details", async done => {
		let fooToCreate = new CreateFooRequestModel(fixtures.foo, fixtures.user);

		const foo = await repo.create(fooToCreate);

		const updatedFoo = await repo.update(foo.id, new UpdateFooRequestModel({
			description: "test description"
		}));

		expect(updatedFoo).toEqual(jasmine.any(UpdateFooResponseModel));
		expect(updatedFoo.description).toBe("test description");

		done();
	});

	it("should find all foos", async done => {
		let foo = fixtures.foo;
		delete foo.id;

		let fooToCreate1 = new CreateFooRequestModel(foo, fixtures.user);

		const foo1 = await repo.create(fooToCreate1);

		let fooToCreate2 = new CreateFooRequestModel(foo, fixtures.user);

		const foo2 = await repo.create(fooToCreate2);

		const foos = await repo.findAll();

		expect(foos.length).toBe(2);

		done();
	});

});
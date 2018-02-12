const testUtils = require("fruster-test-utils");
const bus = require("fruster-bus");
const FooRepo = require("../lib/repos/FooRepo");
const constants = require("../lib/constants");
const fixtures = require("./support/fixtures");
const errors = require("../lib/errors");
const MockBarService = require('./support/MockBarService');
const Db = require("mongodb").Db;

const FooModel = require('../lib/models/FooModel');


describe("FooRepo", () => {

	/** @type {FooRepo} */
	let repo;
	/** @type {Db} */
	let db;

	testUtils.startBeforeEach({
		mockNats: true,
		mongoUrl: "mongodb://localhost:27017/fruster-template-service-test",
		afterStart: (connection) => {
			db = connection.db;
			repo = new FooRepo(connection.db);
		}
	});

	it("should create Foo", async done => {
		const createdFoo = await createFoo(fixtures.foo, fixtures.user);

		expect(createdFoo).toEqual(jasmine.any(FooModel));
		expect(createdFoo.id).toBeDefined("should have created id");
		// @ts-ignore
		expect(createdFoo._id).toBeUndefined("should not leak _id");
		expect(createdFoo.name).toBe(fixtures.foo.name);

		done();
	});

	it("should get Foo by id", async done => {
		const foo = await createFoo(fixtures.foo, fixtures.user);

		const retrievedFoo = await repo.getById(foo.id);

		expect(retrievedFoo).toEqual(jasmine.any(FooModel));
		expect(retrievedFoo).toBeDefined("should have gotten foo by id");
		// @ts-ignore
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
		const foo = await createFoo(fixtures.foo, fixtures.user);

		const updatedFoo = await repo.update(foo.id, {
			description: "test description"
		});

		expect(updatedFoo).toEqual(jasmine.any(FooModel));
		expect(updatedFoo.description).toBe("test description");

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

	async function createFoo(foo, user) {
		const repo = new FooRepo(db);
		return await repo.create(new FooModel(foo, user));
	}

});
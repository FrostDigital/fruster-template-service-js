const testUtils = require("fruster-test-utils");
const FooRepo = require("../lib/repos/FooRepo");
const constants = require("../lib/constants");
const fixtures = require("./support/fixtures");

describe("FooRepo", () => {
	
	/** @type {FooRepo} */
	let repo;

	testUtils.startBeforeEach({
		mockNats: true,
		mongoUrl: "mongodb://localhost:27017/fruster-template-service-test",
		afterStart: (connection) => repo = new FooRepo(connection.db)
	});
	
	it("should create Foo", async done => {		
		let fooToCreate = fixtures.foo;
		delete fooToCreate.id;

		const createdFoo = await repo.create(fooToCreate);

		expect(createdFoo.id).toBeDefined("should have created id");
		expect(createdFoo._id).toBeUndefined("should not leak _id");
		expect(createdFoo.name).toBe(fooToCreate.name);

		done();			
	});

	it("should get Foo by id", async done => {		
		const foo = await repo.create(fixtures.foo);		
		const retrievedFoo = await repo.getById(foo.id);

		expect(retrievedFoo).toBeDefined("should have gotten foo by id");
		expect(retrievedFoo._id).toBeUndefined("should not leak _id");

		done();			
	});

	it("should get return null if Foo does not exist", async done => {		
		const retrievedFoo = await repo.getById("fake-id");

		expect(retrievedFoo).toBe(null);		

		done();			
	});

	it("should update Foo name", async done => {		
		const foo = await repo.create(fixtures.foo);		
		const updatedFoo = await repo.update(foo.id, {name: "updated name"});

		expect(updatedFoo.name).toBe("updated name");

		done();			
	});

	it("should find all foos", async done => {		
		const foo1 = await repo.create(fixtures.foo);		
		const foo2 = await repo.create(fixtures.foo);				
		const foos = await repo.findAll();

		expect(foos.length).toBe(2);

		done();			
	});
	
});
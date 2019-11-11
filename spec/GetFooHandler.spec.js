const BarServiceClient = require("../lib/clients/BarServiceClient");
const frusterTestUtils = require("fruster-test-utils");
const specConstants = require("./support/spec-constants");
const FooModel = require('../lib/models/FooModel');
const constants = require("../lib/constants");
const fixtures = require("./support/fixtures");
const errors = require("../lib/errors");
const bus = require("fruster-bus").testBus;
const Db = require("mongodb").Db;

describe("GetFooHandler", () => {

	/** @type {Db} */
	let db;

	frusterTestUtils.startBeforeEach(specConstants.testUtilsOptions(async (connection) => db = connection.db));

	it("should return BAD_REQUEST if id is not a uuid", async (done) => {
		try {
			await bus.request({
				subject: constants.endpoints.service.GET_FOO,
				message: {
					user: fixtures.user,
					data: { id: "fake" }
				}
			});

			done.fail();
		} catch (err) {
			expect(err.status).toBe(400);
			expect(err.error.code).toBe(errors.badRequest().error.code);

			done();
		}
	});

	it("should return NOT_FOUND if Foo does not exist", async done => {
		try {
			await bus.request({
				subject: constants.endpoints.service.GET_FOO,
				message: {
					user: fixtures.user,
					data: { id: fixtures.foo.id }  // <- does not exist
				}
			});

			done.fail();
		} catch (err) {
			expect(err.status).toBe(404);
			expect(err.error.code).toBe(errors.notFound().error.code);

			done();
		}
	});

	it("should return PERMISSION_DENIED if user has not permission to get foo", async done => {
		try {
			const user = { ...fixtures.user, scopes: ["some-scope-not-valid-for-endpoint"] };

			await bus.request({
				subject: constants.endpoints.service.GET_FOO,
				message: {
					user: user,
					data: { id: fixtures.foo.id }
				}
			});

			done.fail();
		} catch (err) {
			expect(err.status).toBe(403);
			expect(err.error.code).toBe("PERMISSION_DENIED");

			done();
		}
	});

	it("should get Foo by its id", async () => {
		const foo = new FooModel({ ...fixtures.foo, barId: "ramjam" }, fixtures.user);
		const bar = (id) => ({ id, bar: "bar" });

		await db.collection(constants.collections.FOOS).insertOne(foo);

		const mockGetBarRequest = frusterTestUtils.mockService({
			subject: BarServiceClient.endpoints.GET_BAR,
			response: ({ data: { barId } }) => ({
				status: 200,
				data: bar(barId)
			})
		});

		const resp = await bus.request({
			subject: constants.endpoints.service.GET_FOO,
			message: {
				user: fixtures.user,
				data: { id: foo.id }
			}
		});

		expect(resp.status).toBe(200);

		expect(mockGetBarRequest.invocations).toBe(1);
		expect(mockGetBarRequest.requests[0].data.barId).toBe(foo.barId);
	});

});

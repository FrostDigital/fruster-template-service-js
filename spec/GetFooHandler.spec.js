const BarServiceClient = require("../lib/clients/BarServiceClient");
const frusterTestUtils = require("fruster-test-utils");
const specConstants = require("./support/spec-constants");
const FooModel = require("../lib/models/FooModel");
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
		} catch ({ status, error }) {
			expect(status).toBe(400, "err.status");
			expect(error.code).toBe(errors.badRequest().error.code, "err.code");

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
		} catch ({ status, error }) {
			expect(status).toBe(404, "err.status");
			expect(error.code).toBe(errors.notFound().error.code, "err.code");

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
		} catch ({ status, error }) {
			expect(status).toBe(403, "err.status");
			expect(error.code).toBe("PERMISSION_DENIED", "err.code");

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

		const { status } = await bus.request({
			subject: constants.endpoints.service.GET_FOO,
			message: {
				user: fixtures.user,
				data: { id: foo.id }
			}
		});

		expect(status).toBe(200, "status");

		expect(mockGetBarRequest.invocations).toBe(1, "mockGetBarRequest.invocations");
		expect(mockGetBarRequest.requests[0].data.barId).toBe(foo.barId, "barId");
	});

});

const bus = require("fruster-bus");
const frusterTestUtils = require("fruster-test-utils");
const fixtures = require("./support/fixtures");
const specConstants = require("./support/spec-constants");
const constants = require("../lib/constants");


describe("CreateFooHandler", () => {

	frusterTestUtils.startBeforeEach(specConstants.testUtilsOptions());

	it("should return PERMISSION_DENIED if user has not permission to create foo", async done => {
		try {
			const user = { ...fixtures.user, scopes: ["some-scope-not-valid-for-endpoint"] };

			await bus.request({
				subject: constants.endpoints.http.CREATE_FOO,
				skipOptionsRequest: true,
				message: {
					user: user,
					reqId: "reqId",
					data: fixtures.createFooRequest
				}
			});
		} catch (err) {
			expect(err.status).toBe(403);
			expect(err.error.code).toBe("PERMISSION_DENIED");

			done();
		}
	});

	it("should create Foo", async () => {
		const user = { ...fixtures.user, scopes: ["foo.create"] };

		const resp = await bus.request({
			subject: constants.endpoints.http.CREATE_FOO,
			skipOptionsRequest: true,
			message: {
				user,
				reqId: "reqId",
				data: fixtures.createFooRequest
			}
		});

		expect(resp.status).toBe(200);
	});
});

import { testBus } from "fruster-bus";
import fixtures from "./support/fixtures";
import constants from "../lib/constants";
import specConstants from "./support/spec-constants";

const frusterTestUtils = require("fruster-test-utils");

describe("CreateFooHandler", () => {

	frusterTestUtils.startBeforeEach(specConstants.testUtilsOptions(() => { }));

	it("should return PERMISSION_DENIED if user has not permission to create foo", async done => {
		try {
			const user = { ...fixtures.user, scopes: ["some-scope-not-valid-for-endpoint"] };

			await testBus.request({
				subject: constants.endpoints.http.CREATE_FOO,
				skipOptionsRequest: true,
				message: {
					user: user,
					reqId: "reqId",
					data: fixtures.createFooRequest
				}
			});

			done.fail();
		} catch ({ status, error }) {
			expect(status).toBe(403, "err.status");
			expect(error.code).toBe("PERMISSION_DENIED", "err.code");

			done();
		}
	});

	it("should possible to create Foo", async () => {
		const user = { ...fixtures.user, scopes: ["foo.create"] };

		const { status } = await testBus.request({
			subject: constants.endpoints.http.CREATE_FOO,
			skipOptionsRequest: true,
			message: {
				user,
				reqId: "reqId",
				data: fixtures.createFooRequest
			}
		});

		expect(status).toBe(201, "status");
	});
});

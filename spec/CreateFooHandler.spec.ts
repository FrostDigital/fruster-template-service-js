import { testBus as bus } from "fruster-bus";
import frusterTestUtils from "fruster-test-utils";
import fixtures from "./support/fixtures";
import specConstants from "./support/spec-constants";
import { HTTP_SUBJECT } from "../lib/handlers/CreateFooHandler";

describe("CreateFooHandler", () => {

	frusterTestUtils.startBeforeEach(specConstants.testUtilsOptions());

	it("should return PERMISSION_DENIED if user has not permission to create foo", async done => {
		try {
			const user = { ...fixtures.user, scopes: ["some-scope-not-valid-for-endpoint"] };

			await bus.request({
				subject: HTTP_SUBJECT,

				message: {
					user: user,
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

		const { status } = await bus.request({
			subject: HTTP_SUBJECT,
			message: {
				user,
				data: fixtures.createFooRequest
			}
		});

		expect(status).toBe(201, "status");
	});
});

import { testBus } from "@fruster/bus";
import frusterTestUtils from "@fruster/test-utils";

import { HTTP_SUBJECT } from "../lib/handlers/CreateFooHandler";
import CreateFooRequest from "../lib/schemas/CreateFooRequest";
import FooWithBar from "../lib/schemas/FooWithBar";

import fixtures from "./support/fixtures";
import specConstants from "./support/spec-constants";

describe("CreateFooHandler", () => {

	frusterTestUtils.startBeforeEach(specConstants.testUtilsOptions());

	it("should return PERMISSION_DENIED if user has not permission to create foo", async () => {
		try {
			const user = { ...fixtures.user, scopes: ["some-scope-not-valid-for-endpoint"] };

			await testBus.request({
				subject: HTTP_SUBJECT,
				message: {
					user: user,
					data: fixtures.createFooRequest
				}
			});

			fail();
		} catch ({ status, error }: any) {
			expect(status).toBe(403);
			expect(error.code).toBe("PERMISSION_DENIED");
		}
	});

	it("should possible to create Foo", async () => {
		const user = { ...fixtures.user, scopes: ["foo.create"] };

		const { status } = await testBus.request<CreateFooRequest, FooWithBar>({
			subject: HTTP_SUBJECT,
			message: {
				user,
				data: fixtures.createFooRequest
			}
		});

		expect(status).toBe(201);
	});

	it("should return PERMISSION_DENIED if user has not permission to create foo", async () => {
		try {
			const user = { ...fixtures.user, scopes: ["some-scope-not-valid-for-endpoint"] };

			await testBus.request({
				subject: HTTP_SUBJECT,
				message: {
					user,
					data: fixtures.createFooRequest
				}
			});

			fail();
		} catch ({ status, error }: any) {
			expect(status).toBe(403);
			expect(error.code).toBe("PERMISSION_DENIED");
		}
	});
});

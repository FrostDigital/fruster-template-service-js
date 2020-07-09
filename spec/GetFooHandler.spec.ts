import { v4 } from "uuid";
import { Db } from "mongodb";
import { testBus } from "fruster-bus";
import constants from "../lib/constants";
import errors from "../lib/errors";
import BarServiceClient from "../lib/clients/BarServiceClient";
import specConstants from "./support/spec-constants";
import fixtures from "./support/fixtures";

const frusterTestUtils = require("fruster-test-utils");

describe("GetFooHandler", () => {

	let db: Db;

	frusterTestUtils.startBeforeEach(specConstants.testUtilsOptions(
		async (connection: any) => db = connection.db)
	);

	it("should return BAD_REQUEST if id is not a uuid", async (done) => {
		try {
			await testBus.request({
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
			await testBus.request({
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

			await testBus.request({
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
		const foo = {
			...fixtures.foo,
			id: v4(),
			barId: "ramjam",
			created: new Date(),
			createdBy: fixtures.user.id,
			description: "test"
		};
		const bar = (id: string) => ({ id, bar: "bar" });

		await db.collection(constants.collections.FOOS).insertOne(foo);

		const mockGetBarRequest = frusterTestUtils.mockService({
			subject: BarServiceClient.endpoints.GET_BAR,
			response: ({ data: { barId } }: any) => ({
				status: 200,
				data: bar(barId)
			})
		});

		const { status } = await testBus.request({
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

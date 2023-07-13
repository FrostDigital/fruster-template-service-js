import { v4 } from "uuid";
import { Db } from "mongodb";
import { testBus } from "@fruster/bus";
import frusterTestUtils from "@fruster/test-utils";

import BarServiceClient from "../lib/clients/BarServiceClient";
import { SERVICE_SUBJECT } from "../lib/handlers/GetFooHandler";
import GetFooRequest from "../lib/schemas/GetFooRequest";
import FooWithBar from "../lib/schemas/FooWithBar";
import constants from "../lib/constants";
import errors from "../lib/errors";

import specConstants from "./support/spec-constants";
import fixtures from "./support/fixtures";
import Foo from "../lib/models/Foo";

describe("GetFooHandler", () => {

	let db: Db;

	frusterTestUtils.startBeforeEach(specConstants.testUtilsOptions(async (connection: any) => db = connection.db));

	it("should return BAD_REQUEST if id is not a uuid", async () => {
		try {
			await testBus.request({
				subject: SERVICE_SUBJECT,
				message: {
					user: fixtures.user,
					data: { id: "fake" }
				}
			});

			fail();
		} catch ({ status, error }: any) {
			expect(status).toBe(400);
			expect(error.code).toBe(errors.badRequest().error.code);
		}
	});

	it("should return NOT_FOUND if Foo does not exist", async () => {
		try {
			await testBus.request({
				subject: SERVICE_SUBJECT,
				message: {
					user: fixtures.user,
					data: { id: v4() }  // <- does not exist
				}
			});

			fail();
		} catch ({ status, error }: any) {
			expect(status).toBe(404);
			expect(error.code).toBe(errors.notFound().error.code);
		}
	});

	it("should get Foo by its id", async () => {
		const foo: Foo = {
			...fixtures.foo,
			id: v4(),
			bar: { id: "ramjam" },
			created: new Date(),
			createdBy: {
				id: fixtures.user.id
			},
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

		const { status } = await testBus.request<GetFooRequest, FooWithBar>({
			subject: SERVICE_SUBJECT,
			message: {
				user: fixtures.user,
				data: { id: foo.id }
			}
		});

		expect(status).toBe(200);

		expect(mockGetBarRequest.invocations).toBe(1);
		expect(mockGetBarRequest.requests[0].data.barId).toBe(foo.bar.id);
	});

});

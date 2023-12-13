import { v4 } from "uuid";
import { Db } from "mongodb";
import { testBus } from "@fruster/bus";
import frusterTestUtils from "@fruster/test-utils";

import { LISTENER_SUBJECT } from "../lib/listeners/BarDeletedListener";
import Foo from "../lib/models/Foo";
import FooRepo from "../lib/repos/FooRepo";
import BarDeletedRequest from "../lib/schemas/BarDeletedRequest";
import BarDeletedResponse from "../lib/schemas/BarDeletedResponse";
import errors from "../lib/errors";

import fixtures from "./support/fixtures";
import specConstants from "./support/spec-constants";

describe("BarDeletedListener", () => {

	let repo: FooRepo;

	let db: Db;

	frusterTestUtils
		.startBeforeEach(specConstants
			.testUtilsOptions(async (connection: any) => {
				db = connection.db;
				repo = new FooRepo(db);
			}));

	it("should return BAD_REQUEST if received invalid data", async () => {
		try {
			await testBus.request({
				subject: LISTENER_SUBJECT,
				message: {
					user: fixtures.user,
					data: {}
				}
			});

			fail();
		} catch ({ status, error }: any) {
			expect(status).toBe(400);
			expect(error.code).toBe(errors.badRequest().error.code);
		}
	});

	it("should be possible to delete foos by bar id", async () => {
		const barId = v4();

		await createFoo({ ...fixtures.foo, bar: { id: barId } });
		await createFoo({ ...fixtures.foo, bar: { id: barId } });

		const { status, data } = await testBus.request<BarDeletedRequest, BarDeletedResponse>({
			subject: LISTENER_SUBJECT,
			message: {
				data: { id: barId }
			}
		});

		expect(status).toBe(200);
		expect(data.deletedCount).toBe(2);
	});

	const createFoo = async (foo: Foo): Promise<Foo> => {
		return await repo.create(foo, fixtures.user.id);
	}
});

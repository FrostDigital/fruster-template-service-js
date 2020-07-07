import { v4 } from "uuid";
import FooRepo from "../lib/repos/FooRepo";
import constants from "../lib/constants";
import errors from "../lib/errors";
import fixtures from "./support/fixtures";
import specConstants from "./support/spec-constants";

const bus = require("fruster-bus").testBus;
const frusterTestUtils = require("fruster-test-utils");

describe("BarDeletedListener", () => {

	/** @type {FooRepo} */
	let repo;

	/** @type {Db} */
	let db;

	frusterTestUtils
		.startBeforeEach(specConstants
			.testUtilsOptions(async (connection) => {
				db = connection.db;
				repo = new FooRepo(db);
			}));

	it("should return BAD_REQUEST if received invalid data", async done => {
		try {
			await bus.request({
				subject: constants.endpoints.listener.BAR_DELETED,
				skipOptionsRequest: true,
				message: {
					user: fixtures.user,
					reqId: "reqId",
					data: {}
				}
			});

			done.fail();

		} catch ({ status, error }) {
			expect(status).toBe(400, "err.status");
			expect(error.code).toBe(errors.badRequest().error.code, "err.code");

			done();
		}
	});

	it("should be possible to delete foos by bar id", async () => {
		const barId = v4();

		await createFoo({ ...fixtures.foo, barId });
		await createFoo({ ...fixtures.foo, barId });

		const { status, data } = await bus.request({
			subject: constants.endpoints.listener.BAR_DELETED,
			skipOptionsRequest: true,
			message: {
				reqId: "reqId",
				data: { barId }
			}
		});

		expect(status).toBe(200, "status");
		expect(data.deletedCount).toBe(2, "deleted count");
	});

	async function createFoo(foo) {
		return await repo.create({ ...foo, createdBy: fixtures.user.id });
	}
});

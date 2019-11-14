const Db = require("mongodb").Db;
const bus = require("fruster-bus");
const frusterTestUtils = require("fruster-test-utils");
const uuid = require("uuid");
const fixtures = require("./support/fixtures");
const specConstants = require("./support/spec-constants");
const FooRepo = require("../lib/repos/FooRepo");
const constants = require("../lib/constants");
const errors = require("../lib/errors");
const FooModel = require('../lib/models/FooModel');

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

		} catch (err) {
			expect(err.status).toBe(400);
			expect(err.error.code).toBe(errors.badRequest().error.code);

			done();
		}
	});

	it("should be possible to delete foos by bar id", async () => {
		const barId = uuid.v4();

		await createFoo({...fixtures.foo, barId});
		await createFoo({...fixtures.foo, barId});

		const resp = await bus.request({
			subject: constants.endpoints.listener.BAR_DELETED,
			skipOptionsRequest: true,
			message: {
				reqId: "reqId",
				data: { barId }
			}
		});

		expect(resp.status).toBe(200);
		expect(resp.data.deletedCount).toBe(2);
	});

	async function createFoo(foo) {
		return await repo.create(new FooModel(foo, fixtures.user));
	}
});

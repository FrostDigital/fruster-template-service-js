const Db = require("mongodb").Db;
const bus = require("fruster-bus");
const frusterTestUtils = require("fruster-test-utils");
const fixtures = require("./support/fixtures");
const specConstants = require("./support/spec-constants");
const FooRepo = require("../lib/repos/FooRepo");
const constants = require("../lib/constants");
const errors = require("../lib/errors");
const MockBarService = require('./support/MockBarService');
const log = require("fruster-log");

const FooModel = require('../lib/models/FooModel');


describe("GetFooHandler", () => {

    /** @type {FooModel} */
    let foo;

    /** @type {Db} */
    let db;

    afterEach(bus.clearClients);

    frusterTestUtils
        .startBeforeEach(specConstants
            .testUtilsOptions(async (connection) => {
                MockBarService.init();
                db = connection.db;
                foo = await createFoo(db);
            }));

    it("should return BAD_REQUEST if id is not a uuid", async done => {
        try {
            await bus.request({
                subject: constants.endpoints.service.GET_FOO,
                skipOptionsRequest: true,
                message: {
                    user: fixtures.user,
                    reqId: "reqId",
                    data: { id: "fake" }
                }
            });

        } catch (err) {
            expect(err.status).toBe(400);
            expect(err.error.code).toBe(errors.badRequest().error.code);

            done();
        }
    });

    it("should return NOT_FOUND if Foo does not exist", async done => {
        try {
            await bus.request({
                subject: constants.endpoints.service.GET_FOO,
                skipOptionsRequest: true,
                message: {
                    user: fixtures.user,
                    reqId: "reqId",
                    data: { id: "26911e7d-bb4c-4a11-a93d-34240993bba2" }  // <- does not exist
                }
            });
        } catch (err) {
            expect(err.status).toBe(404);
            expect(err.error.code).toBe(errors.notFound().error.code);

            done();
        }
    });

    it("should return PERMISSION_DENIED if user has not permission to get foo", async done => {
        try {
            let user = fixtures.user;
            user.scopes = [];

            await bus.request({
                subject: constants.endpoints.service.GET_FOO,
                skipOptionsRequest: true,
                message: {
                    user: user,
                    reqId: "reqId",
                    data: { id: foo.id }
                }
            });
        } catch (err) {
            expect(err.status).toBe(403);
            expect(err.error.code).toBe("PERMISSION_DENIED");

            done();
        }
    });

    it("should get Foo by its id", async done => {
        try {
            const resp = await bus.request({
                subject: constants.endpoints.service.GET_FOO,
                skipOptionsRequest: true,
                message: {
                    user: fixtures.user,
                    reqId: "reqId",
                    data: { id: foo.id }
                }
            });

            expect(resp.status).toBe(200);
            done();
        } catch (err) {
            log.error(err);
            done.fail(err);
        }
    });

    async function createFoo(db) {
        const repo = new FooRepo(db);

        return await repo.create(new FooModel({
            name: "name"
        }, fixtures.user));
    }
});
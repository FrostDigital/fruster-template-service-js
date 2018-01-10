const bus = require("fruster-bus");
const testUtils = require("fruster-test-utils");
const FooRepo = require("../lib/repos/FooRepo");
const constants = require("../lib/constants");
const fixtures = require("./support/fixtures");
const frusterTemplateService = require("../fruster-template-service");

const CreateFooRequestModel = require("../lib/models/CreateFooRequestModel");

describe("GetFooHandler", () => {

    let foo;

    testUtils.startBeforeEach({
        mockNats: true,
        mongoUrl: "mongodb://localhost:27017/fruster-template-service-test",
        service: frusterTemplateService,
        afterStart: createFoo
    });

    it("should return BAD_REQUEST if id is not a uuid", async done => {
        try {
            await bus.request(constants.endpoints.service.GET_FOO, {
                reqId: "reqId",
                data: {
                    id: "fake"
                }
            });
        } catch (err) {
            expect(err.status).toBe(400);
            expect(err.error.code).toBe("BAD_REQUEST");
            done();
        }
    });

    it("should return NOT_FOUND if Foo does not exist", async done => {
        try {
            await bus.request(constants.endpoints.service.GET_FOO, {
                reqId: "reqId",
                data: {
                    id: "26911e7d-bb4c-4a11-a93d-34240993bba2" // <- does not exist
                }
            });
        } catch (err) {
            expect(err.status).toBe(404);
            expect(err.error.code).toBe("NOT_FOUND");
            done();
        }
    });

    it("should get Foo by its id", async done => {
        const resp = await bus.request(constants.endpoints.service.GET_FOO, {
            reqId: "reqId",
            data: {
                id: foo.id
            }
        });

        expect(resp.status).toBe(200);
        done();
    });

    async function createFoo(connection) {
        const repo = new FooRepo(connection.db);
        foo = await repo.create(new CreateFooRequestModel({
            name: "name"
        }, fixtures.user));
    }
});
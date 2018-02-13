const bus = require("fruster-bus");
const BarClient = require('../../lib/clients/BarClient');

/** 
 * Mocked version of Bar service, registering subscribes for all of Bar service's endpoints.
 */
class MockBarService {

    constructor() { }

    /** 
     * Uses static function for ease-of-use.
     */
    static init() {
        const bar = (barId) => ({ id: barId, bar: "bar" });

        bus.subscribe({
            subject: BarClient.endpoints.GET_BAR,
            handle: req => ({ status: 200, data: bar(req.data.barId) })
        });
    }

}

module.exports = MockBarService;
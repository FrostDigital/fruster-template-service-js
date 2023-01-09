const Jasmine = require("jasmine");
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
const noop = function () { };

/*
	Bootstraps Jasmine and use the jasmine-spec-reporter which
	makes test output look prettier compared to default reporter.
*/
let jRunner = new Jasmine({});
jRunner.configureDefaultReporter({ print: noop });
jasmine.getEnv().addReporter(new SpecReporter());
jRunner.loadConfigFile("./spec/support/jasmine.json");
jRunner.execute();

if (process.env.CI) {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	process.env.OPTIONS_TIMEOUT = "500ms";
}

export default () => { };

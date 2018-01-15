const Jasmine = require("jasmine");
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
const noop = function () {};

/*
    Bootstraps Jasmine and use the jasmine-spec-reporter which 
    makes test ouput look prettier compared to default reporter. 
*/

let jrunner = new Jasmine();
jrunner.configureDefaultReporter({
    print: noop
});
jasmine.getEnv().addReporter(new SpecReporter());
jrunner.loadConfigFile();
jrunner.execute();
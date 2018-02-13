let fixtures = module.exports;

// TODO: Best practise?

class Fixtures {

    get foo() {

        return {
            id: "a0eee7de-ebb2-4ba9-b06a-572aa6673178",
            name: "foo"
        };

    }

    get user() {

        return {
            id: "7680e430-97b8-4fff-96f6-863312008cb0",
            name: "Dinuka Thilanga",
            scopes: ["get.foo"]
        };

    }

}

module.exports = new Fixtures();
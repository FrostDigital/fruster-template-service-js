let fixtures = module.exports;

// TODO: Best practise?

class Fixtures {

    get foo() {
        return {
            id: "a0eee7de-ebb2-4ba9-b06a-572aa6673178",
            name: "foo"
        };
    }

}

module.exports = new Fixtures();
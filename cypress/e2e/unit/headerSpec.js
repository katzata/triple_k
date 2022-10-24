// require('ignore-styles').default(['.sass', '.scss']);
// const jsdom = require('mocha-jsdom');
const Header = require("../../../src/components/core/Header/Header").default;

function headerSpec() {
    describe("Test", function () {
        // const jsdom = require('mocha-jsdom');
        const header = new Header();
        
        it("yay?", function () {
            console.log(header);
            // expect(baseComponent[prop]).to.eq(value);
        });
        // for (const [prop, value] of expectedProps) {
        //     it(`this.${prop} = ${value}`, function () {
        //         expect(baseComponent[prop]).to.eq(value);
        //     });
        // };

        // for (const method of expectedMethods.content) {
        //     it(`this.${method} is a function`, function () {
        //         expect(baseComponent[method]).to.be.instanceof(expectedMethods.type);
        //     });
            
        //     if (method === "isAttached") {
        //         it(`this.${method} returns null`, function () {
        //             expect(baseComponent[method]()).eq(null);
        //         });
        //     };
        // };
    });
};

module.exports = { 
    headerSpec
}
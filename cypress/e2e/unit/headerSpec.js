const { expect } = require("chai");
const BaseComponent = require("../../../src/components/core/BaseComponent/BaseComponent").default;
const Header = require("../../../src/components/core/Header/Header").default;

function headerSpec() {
    describe("Test", function () {
        
        describe("Initial header values", function () {
            const header = new Header();

            it("All initial header values as expected", function () {
                expect(header.component).instanceof(HTMLElement);
                expect(header.id).eq("header");
                expect(header.navHovering).eq(null);
                expect(header.subComponents).to.have.length(1);
                expect(header.eventHandlers).to.have.length(4);
            });

            it("Header extends the propper class (BaseComponent)", function () {
                expect(header).instanceof(BaseComponent);
            });

            it("Header extends the propper class (BaseComponent)", function () {
                console.log(header.currentLang);
                console.log(document);
                // expect(header.currentLang).instanceof(BaseComponent);
            });
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
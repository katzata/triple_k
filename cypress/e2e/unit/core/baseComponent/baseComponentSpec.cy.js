import BaseComponent from "../../../../../src/components/core/BaseComponent/BaseComponent";
import { expectedProps, expectedMethods, testElement } from "./mockup";

export default function baseComponentSpec() {
    return (
        describe("Base component", function () {
            describe("All properties and methods present, initial values as expected", function () {
                const baseComponent = new BaseComponent();
    
                for (const [prop, value] of expectedProps) {
                    it(`this.${prop} = ${value}`, function () {
                        expect(baseComponent[prop]).to.eq(value);
                    });
                };
    
                for (const method of expectedMethods.content) {
                    it(`this.${method} is a function`, function () {
                        expect(baseComponent[method]).to.be.instanceof(expectedMethods.type);
                    });
                    
                    if (method === "isAttached") {
                        it(`this.${method} returns null`, function () {
                            expect(baseComponent[method]()).eq(null);
                        });
                    };
                };
            });
    
            describe("Individual method tests", () => {
                it("Animations loop method starts, runs a function and stops as expected (10 frames)", function () {
                    const baseComponent = new BaseComponent();
                    const component = baseComponent.component = baseComponent.createElement("div", {id:"test"});
                    const body = document.querySelector("body");
                    let counter = 0;
        
                    body.appendChild(component);
                    baseComponent.animationsLoop([() => {
                        if (counter++ === 10) baseComponent.remove();
                    }]);
                    
                    cy.wrap(body).find("div#test").should("exist");
                    cy.wrap(body).find("div#test").should("not.exist");
                });
    
                describe("Add sub components method", () => {
                    const baseComponent = new BaseComponent();
                    beforeEach(() => baseComponent.component = baseComponent.createElement("main"));
    
                    it("Add function", () => {
                        baseComponent.addSubComponents([() => baseComponent.createElement(...testElement("x"))]);
                        expect(baseComponent.component).descendants("div.test-x");
                    });
    
                    it("Add html element", () => {
                        baseComponent.addSubComponents([baseComponent.createElement(...testElement("x"))]);
                        expect(baseComponent.component).descendants("div.test-x");
                    });
                    
                    it("Add multiple mixed elements (function and html element)", () => {
                        baseComponent.addSubComponents([
                            () => baseComponent.createElement(...testElement("x")),
                            baseComponent.createElement(...testElement("y"))
                        ]);
    
                        expect(baseComponent.component).descendants("div.test-x");
                        expect(baseComponent.component).descendants("div.test-y");
                    });
    
                    describe("Add invalid values", () => {
                        const values = [
                            ["x", TypeError],
                            [0, TypeError],
                            [{}, TypeError],
                            [[], undefined]
                        ];
    
                        invalidValues(baseComponent.addSubComponents, values);
                    });
                });
    
                describe("Add child sub components method", () => {
                    const baseComponent = new BaseComponent();
                    beforeEach(() => baseComponent.component = baseComponent.createElement("main", {}, [baseComponent.createElement(...testElement("x"))]));
                    
                    it("Add child sub component", () => {
                        baseComponent.addChildSubComponents([
                            [".test-x", baseComponent.createElement(...testElement("y"))]
                        ]);
        
                        expect(baseComponent.component).descendants("div.test-x>.test-y");
                    });
    
                    it("Add multiple child sub component", () => {
                        baseComponent.addChildSubComponents([
                            [".test-x", baseComponent.createElement(...testElement("y"))],
                            [".test-y", baseComponent.createElement(...testElement("z"))]
                        ]);
        
                        expect(baseComponent.component)
                            .descendants("div.test-x>.test-y")
                            .descendants("div.test-z");
                    });
    
                    describe("Add invalid values", () => {
                        const values = [
                            ["", TypeError, "empty string"],
                            ["x", undefined],
                            [0, TypeError],
                            [{}, TypeError],
                            [[], TypeError]
                        ];
                        invalidValues(baseComponent.addChildSubComponents, values);
                    });
                });
        
                describe("Create element method", () => {
                    const baseComponent = new BaseComponent();
    
                    it("Create single element", function () {
                        const newElement = baseComponent.createElement(...testElement("x"));
                        expect(newElement)
                            .instanceof(HTMLDivElement)
                            .class("test-x");
                    });
            
                    it("Create nested elements", function () {
                        const newElement = baseComponent.createElement(...testElement(2));
                        const newElements = baseComponent.createElement(...testElement(1), [newElement]);
            
                        expect(newElements)
                            .instanceof(HTMLDivElement)
                            .class("test-1")
                            .descendants("div.test-2");
                    });
    
                    describe("Add invalid values", () => {
                        const values = [
                            [0, Error],
                            [{}, Error],
                            [[], Error]
                        ];
    
                        invalidValues(baseComponent.createElement, values);
                    });
                });
        
                describe("Random method", () => {
                    const baseComponent = new BaseComponent();
    
                    it("Generates a number within range (100 attempts)", function () {
                        for (let i = 1; i <= 100; i++) {
                            const random = baseComponent.random(i);
                            const calc = Math.ceil(i / 2);
    
                            expect(random).to.be.within(-calc, calc); 
                        };
                    });
    
                    describe("Add invalid values", () => {
                        const values = [
                            ["x", NaN],
                            [{}, NaN],
                            [[], 0]
                        ];
    
                        invalidValues(baseComponent.random, values);
                    });
                });
    
                describe("Event handlers method", () => {
                    const baseComponent = new BaseComponent();
                    const test = () => "yay";
    
                    beforeEach(() => {
                        baseComponent.component = baseComponent.createElement(...testElement("x"), [baseComponent.createElement(...testElement("y"))]);
                    });
    
                    it("Adds event handlers as expected", () => {
                        baseComponent.addEventHandlers([
                            { targetClass: ".test-y", event: "onclick", handler: test }
                        ]);
    
                        expect(baseComponent.component.children[0].onclick).instanceof(Function);
                    });
    
                    describe("Add invalid values", () => {
                        const baseComponent = new BaseComponent();
                        const values = [
                            [{ targetId: "", event: "onclick", handler: test }, null, "empty targetId"],
                            [{ targetClass: "", event: "onclick", handler: test }, null, "empty targetClass"],
                            [{ targetClass: ".test-y", event: "", handler: test }, null, "empty event"],
                            [{ targetClass: ".test-y", event: "onclick", handler: "" }, null, "empty handler"],
                            [0, null],
                            [{}, null, "empty Object"],
                            [[], null, "empty Array"]
                        ];
    
                        beforeEach(() => {
                            baseComponent.component = baseComponent.createElement(...testElement("x"), [baseComponent.createElement(...testElement("y"))]);
                        });
    
                        for (const [value, expected, message] of values) {
                            const titleValue = expected ? expected.prototype.name : expected;
                            
                            it(`Add ${message || value.constructor.name} returns ${titleValue}`, () => {
                                baseComponent.addEventHandlers([value]);
    
                                if (expected !== null) {
                                    expect(baseComponent.component.children[0].onclick).instanceof(expected);
                                } else {
                                    expect(baseComponent.component.children[0].onclick).eq(expected);
                                }
                            });
                        };
                    });
                });
    
                describe("Render method", () => {
                    const baseComponent = new BaseComponent();
    
                    it("Renders and removes the component from the DOM as expected", () => {
                        const body = document.querySelector("body");
        
                        baseComponent.component = baseComponent.createElement("div");
                        baseComponent.id = "test";
                        baseComponent.subComponents = [baseComponent.createElement("div", {id:"x"})]
                        baseComponent.childSubComponents = [
                            ["#x", baseComponent.createElement(...testElement("z"))]
                        ];
                        baseComponent.eventHandlers = [
                            { targetClass: ".test-z", event: "onclick", handler: (e) => e.target.id = "tested" }
                        ];
        
                        body.appendChild(baseComponent.render());
                        cy.wrap(body)
                            .find("div#x")
                            .find(".test-z")
                            .should("not.have.id", "tested")
                            .click({force: true})
                            .should("have.id", "tested");
                    });
    
                    describe("Add invalid values", () => {
                        const body = document.querySelector("body");
                        const baseComponent = new BaseComponent();
    
                        it("Render without creating component element returns null", function () {
                            expect(baseComponent.render()).eq(null);
                            cy.wrap(body).find("main").should("not.exist");
                        });
                    });
                });
            });
    
            describe("Setters and getters tests", () => {
                const baseComponent = new BaseComponent();
                beforeEach(() => baseComponent.component = baseComponent.createElement("main"));
    
                it("Set/get component className", function () {
                    baseComponent.className = "tested";
                    expect(baseComponent.className).eq("tested");
                });
    
                it("Set onanimationend", function () {
                    baseComponent.onanimationend = (test) => test;
                    expect(baseComponent.component.onanimationend).instanceof(Function);
                });
            });
        })
    )
};

function invalidValues(funcReference, values) {
    for (const [value, expected, message] of values) {
        const titleValue = expected ? expected.prototype.name : expected;

        it(`Add ${message || value.constructor.name} returns ${titleValue}`, () => {
            if (expected instanceof Function) {
                expect(funcReference([value])).instanceof(expected);
            } else {
                if (expected !== undefined && isNaN(expected)) {
                    expect(funcReference([value])).to.be.NaN;
                } else {
                    expect(funcReference([value])).eq(expected);
                };
            };
        });
    };
};
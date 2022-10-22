import BaseComponent from "../../../../../src/components/core/BaseComponent/BaseComponent";
import { expectedProps, expectedMethods, testElement } from "./mockup";

export default function baseComponentSpec() {
    describe("Base component", function () {
        it("All properties and methods present, initial values as expected", function () {
            const baseComponent = new BaseComponent();

            for (const [prop, value] of expectedProps) {
                expect(baseComponent[prop]).to.eq(value);
            };

            for (const method of expectedMethods.content) {
                expect(baseComponent[method]).to.be.instanceof(expectedMethods.type);
            };
        });

        describe("Individual property tests", () => {
            const baseComponent = new BaseComponent();



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
    
            it("Add sub components method adds element as expected", () => {
                const baseComponent = new BaseComponent();

                baseComponent.component = baseComponent.createElement(...testElement("x"));
                baseComponent.addSubComponents([
                    () => baseComponent.createElement(...testElement("y")),
                    baseComponent.createElement(...testElement("z"))
                ]);
                
                expect(baseComponent.component).descendants("div.test-y");
                expect(baseComponent.component).descendants("div.test-z");
            });

            it("Add child sub components method adds element to a child node as expected", () => {
                const baseComponent = new BaseComponent();

                baseComponent.component = baseComponent.createElement(...testElement("x"), [baseComponent.createElement(...testElement("y"))]);
                baseComponent.addChildSubComponents([
                    [".test-y", baseComponent.createElement(...testElement("z"))]
                ]);

                expect(baseComponent.component).descendants("div.test-y>.test-z");
            });
    
            describe("Create element method", () => {
                it("Create single element", function () {
                    const baseComponent = new BaseComponent();
                    const newElement = baseComponent.createElement(...testElement("x"));
                    expect(newElement)
                        .instanceof(HTMLDivElement)
                        .class("test-x");
                });
        
                it("Create nested elements", function () {
                    const baseComponent = new BaseComponent();
                    const newElement = baseComponent.createElement(...testElement(2));
                    const newElements = baseComponent.createElement(...testElement(1), [newElement]);
        
                    expect(newElements)
                        .instanceof(HTMLDivElement)
                        .class("test-1")
                        .descendants("div.test-2");
                });
            });
    
            it("Random method generates a number within range (100 attempts)", function () {
                const baseComponent = new BaseComponent();
                for (let i = 1; i <= 100; i++) {
                    const random = baseComponent.random(i);
                    const calc = Math.ceil(i / 2);

                    expect(random).to.be.within(-calc, calc); 
                };
            });

            it("Adds event handlers as expected", () => {
                const baseComponent = new BaseComponent();
                const test = () => "yay";

                baseComponent.component = baseComponent.createElement(...testElement("x"), [baseComponent.createElement(...testElement("y"))]);
                baseComponent.addEventHandlers([
                    { targetClass: ".test-y", event: "onclick", handler: test }
                ]);

                expect(baseComponent.component.children[0].onclick).instanceof(Function);
            });

            it("Renders and removes the component from the DOM as expected", () => {
                const baseComponent = new BaseComponent();
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
        });
    });
};
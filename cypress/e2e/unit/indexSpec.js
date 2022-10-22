const expect = require("chai").expect;
const BaseComponentSpec = require("./core/baseComponent/baseComponentSpec");

describe("Base component", function () {
    it("should add 1+1 correctly", function () {
        const baseComponentSpec = new BaseComponentSpec.default();
        console.log(baseComponentSpec);
        expect(1 + 1).to.eq(2);
        // must call done() so that mocha know that we are... done.
        // Useful for async tests.
    });
});
/**
 * Runs tests!
 * @param {String || Array} type Takes in a string with the specific value "all" or an array of the individual test names.
 * 
 * To run all test use:
 * 
 * runTests("all");
 * or
 * runTests(["initial", "header", "footer", "mainPage", "certificatesPage", "projectsPage"]);
 */
function runTests(type) {
    // describe("All unit tests", () => {
        if (type === "all" || type.includes("initial")) {
            // const baseComponent = require("./core/baseComponent/baseComponentSpec.cy");
            // describe("Core components", () => {
                // const mainCanvas = require("./core/mainCanvas/mainCanvasSpec.cy");
            // });
        };
        // before(() => cy.visit("http://192.168.0.185:9000/"));
        
        // if (type === "all" || type.includes("initial")) {
        //     describe("Initial visit", () => {
        //         const root = require("./core/rootSpec.cy");
        //     });
        // };
    
        // if (type === "all" || type.includes("header")) {
        //     describe("Header", () => { 
        //         const header = require("./core/header/headerSpec.cy");
        //         const nav = require("./core/header/navSpec.cy");
        //         const languageBar = require("./core/header/languageBarSpec.cy");
        //     });
        // };
            
        // if (type === "all" || type.includes("footer")) {
        //     describe("Footer", () => {
        //         const footer = require("./core/footer/footerSpec.cy");
        //     });
        // };
            
        // if (type === "all" || type.includes("mainPage")) {
        //     describe("Main page", () => { 
        //         const mainPage = require("./pages/mainPage/mainPageSpec.cy");
        //     });
        // };
        
        // if (type === "all" || type.includes("certificatesPage")) {
        //     describe("Certificates page", () => {
        //         const certificatesPage = require("./pages/certificatesPage/certificatesPageSpec.cy");
        //     });
        // };
    
        // if (type === "all" || type.includes("projectsPage")) {
        //     describe("Projects page", () => {
        //         const projectsPage = require("./pages/projectsPage/projectsPageSpec.cy");
        //     });
        // };
    // });
};

runTests([
    "initial",
    "header",
    "footer",
    "mainPage",
    "certificatesPage",
    "projectsPage"
]);
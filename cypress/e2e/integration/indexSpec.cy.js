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
    describe("All integration tests", () => {
        // before(() => cy.visit("../../../build/index.html"));
        before(() => cy.visit("https://test-domain.kashchiev.com/"));
        // before(() => cy.visit("http://192.168.0.185:9000/"));
        
        if (type === "all" || type.includes("initial")) {
            describe("Initial visit", () => {
                const root = require("./core/rootSpec.cy");
            });
        };
    
        if (type === "all" || type.includes("header")) {
            describe("Header", () => { 
                const header = require("./core/header/headerSpec.cy");
                const nav = require("./core/header/navSpec.cy");
                const languageBar = require("./core/header/languageBarSpec.cy");
            });
        };
            
        if (type === "all" || type.includes("footer")) {
            describe("Footer", () => {
                const footer = require("./core/footer/footerSpec.cy");
            });
        };
            
        if (type === "all" || type.includes("mainPage")) {
            describe("Main page", () => { 
                const mainPage = require("./pages/mainPage/mainPageSpec.cy");
            });
        };
        
        if (type === "all" || type.includes("certificatesPage")) {
            describe("Certificates page", () => {
                const certificatesPage = require("./pages/certificatesPage/certificatesPageSpec.cy");
            });
        };
    
        if (type === "all" || type.includes("projectsPage")) {
            describe("Projects page", () => {
                const projectsPage = require("./pages/projectsPage/projectsPageSpec.cy");
            });
        };
    });
};

runTests([
    "initial",
    "header",
    "footer",
    "mainPage",
    "certificatesPage",
    "projectsPage"
]);
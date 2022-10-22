import baseComponentSpec from "./core/baseComponent/baseComponentSpec";
// require = require("esm")(module/*, options*/)

function runTests(type) {
    // describe("All unit tests", () => {
        if (type === "all" || type.includes("baseComponent")) {
            baseComponentSpec();
            // const baseComponent = require("./core/baseComponent/baseComponentSpec.cy");
            // describe("Core components", () => {
                // const mainCanvas = require("./core/mainCanvas/mainCanvasSpec.cy");
            // });
        };
        // before(() => cy.visit("http://192.168.0.185:9000/"));
        
        // if (type === "all" || type.includes("baseComponent")) {
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

runTests("all");

// runTests([
//     "baseComponent",
//     "header",
//     "footer",
//     "mainPage",
//     "certificatesPage",
//     "projectsPage"
// ]);
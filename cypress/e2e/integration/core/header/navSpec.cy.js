describe("Nav content", () => {
    it("Nav has the correct children and child count", () => {
        const { navL, main, navR } = require("../../../../../src/localization/en.json").header.nav;
        const navTitles = [navL.title, navR.title];
        const navLinks = [...Object.keys(navL.content), main.title, ...Object.keys(navR.content)];
        
        cy.get(".navSectionTitle").each(($el, $idx) => {
            cy.wrap($el).should("be.visible").and("have.text", navTitles[$idx]);
        });

        cy.get(".navLinks").each(($el, $idx) => {
            cy.wrap($el).should("not.be.visible").and("have.text", navLinks[$idx]);
        });
    });
});

describe("Nav links url change", () => {
    const link = require("../../../../../src/localization/en.json").header.nav.navR.content.GitHub;

    it("Nav links change the url appropriately", () => {
        changePage("/certificates");
        changePage("/interactivecv");
        changePage("/projects");
        changePage("/");
    });

    it("Nav Github link connects (200), and has the propper attributes", () => {
        cy.get(`.navLinks`).contains("GitHub").should("have.attr", "href", link).and("have.attr", "target", "_blank");
        cy.request("GET", link);
    });

    function changePage(link) {
        cy.get(`.navLinks[href="${link}"]`).click({force: true});
        cy.wait(1600);
        cy.url().should("eq", `${ window.location.origin + link.toLocaleLowerCase()}`);
    };
});

describe("Nav main link", () => {
    it("Main link shows and hides appropriately across all pages", () => {
        cy.get(".navMain").should("not.be.visible");
        changePage("/certificates");
        cy.get(".navMain").should("be.visible");
        changePage("/interactivecv");
        cy.get(".navMain").should("be.visible");
        changePage("/projects");
        cy.get(".navMain").should("be.visible");
        changePage("/");
        cy.get(".navMain").should("not.be.visible");
    });

    function changePage(link) {
        cy.get(`.navLinks[href="${link}"]`).click({force: true});
        cy.wait(1600);
    };
});
const projects = require("../../../../../src/assets/portfolio/portfolio.json");

describe("Projects page tests", () => {
    before(() => {
        cy.get(".navLinks").contains("Projects").click({force: true});
        cy.intercept("portfolio.json").as("portfolio");
        cy.wait("@portfolio");
    });

    it("Projects page has the correct children, and links work propperly", () => {
        cy.get("#projectsPage>h2").should("be.visible");
        
        cy.get(".containerWrapper").each(($el, $idx) => {
            cy.wrap($el).find("img").should("have.attr", "src", `../../../assets/portfolio/previews/${projects[$idx].img}.png`);

            cy.wrap($el).find("h4").should("have.text", projects[$idx].details.en.title);
            
            cy.wrap($el).find(".linksContainer")
                .should("exist")
                .and("not.have.css", "transform", `matrix(1, 0, 0, 1, 0, 0)`)
                .children()
                .should("have.length", 2);

            cy.wrap($el).find(`.linksContainer > a`).eq(0).should("contain", projects[$idx].url.title);
            cy.wrap($el).find(`.linksContainer > a`).eq(1).should("contain", projects[$idx].repo.title);

            cy.wrap($el).find(".linksContainer > a > img").should("exist");

            cy.wrap($el).find(".linksContainer>a").each($link => {
                cy.wrap($link).should("have.attr", "target", "_blank");
                cy.request("GET", $link[0].href);
            });

            const { height } = $el[0].getBoundingClientRect();

            cy.wrap($el).find(".description")
                .should("have.text", projects[$idx].details.en.description)
                .and("have.css", "top", `${Math.ceil(height - 2)}px`);
        });
    });
});
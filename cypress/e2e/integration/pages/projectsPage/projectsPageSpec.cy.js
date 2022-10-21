describe("Projects page", () => {
    before(() => {
        cy.get(".navLinks").contains("Projects").click({force: true});
        cy.wait(200);
    });
    
    it("Projects page has the correct children, and links work propperly", () => {
        const projects = require("../../../../../src/localization/en.json").projectsSection.content;

        cy.get("#projectsPage>h2").should("be.visible");
        
        cy.get(".containerWrapper").each(($el, $idx) => {
            cy.wrap($el).find("img").should("have.attr", "src", `../../../assets/previews/${projects[$idx].img}.png`);
            
            cy.wrap($el).find("h4").should("have.text", projects[$idx].title);
            
            cy.wrap($el).find(".linksContainer")
                .should("exist")
                .should("have.css", "transform", `matrix(1, 0, 0, 1, 102.4, 0)`)
                .children()
                .should("have.length", 2);
            
            cy.wrap($el).find(".linksContainer>a")
                .should("contain", projects[$idx].url.title, projects[$idx].repo.title)
                .should("have.attr", "href", projects[$idx].url.content, projects[$idx].repo.title);

            cy.wrap($el).find(".linksContainer>a")
                .children()
                .should("have.length", 2);

            cy.wrap($el).find(".linksContainer>a").each($link => {
                cy.wrap($link).should("have.attr", "target", "_blank");
                cy.request("GET", $link[0].href);
            });

            const { height } = $el[0].getBoundingClientRect();

            cy.wrap($el).find(".description")
                .should("contain", projects[$idx].description)
                .should("have.css", "top", `${height - 2}px`);
        });
    });
});
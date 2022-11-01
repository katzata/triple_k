const { expect } = require("chai");

before(() => {
    cy.get(".navLinks").contains("Certificates").click({force: true});
    cy.wait(200);
});

describe("Certificates page has the correct children and child count", () => {
    const assets = require("../../../../../src/assets/assets");
    const { certificates } = assets;
    const certificatesLength = Object.values(certificates).map(el => el.length).reduce((a, b) => a + b);
    
    it("Title", () => {
        cy.get("#certificatesPage>h2").should("have.text", "Certificates");
    });

    it("Section", () => {
        cy.get("#certificatesPage>.certificatesSection");
    });

    it("Rows all present", () => {
        const rowLength = Object.keys(certificates).length;

        cy.get("#certificatesPage>.certificatesSection>.rowWrapper");
        cy.get(".rowWrapper>h3");
        cy.get(".rowWrapper>.certificatesRow").should("have.length", rowLength);
    });

    it("Certificates all present, and are the correct ones", () => {
        const currentCertificates = Object.values(certificates);

        cy.get(".certificatesRow>.certificateSlot").should("have.length", certificatesLength);

        for (let i = 0; i < currentCertificates.length; i++) {
            for (let j = 0; j < currentCertificates[i].length; j++) {
                cy.get(`.certificateContainer${i}-${j}>.burntPage_f`).should("have.attr", "data-disolve", "0");
                cy.get(`.certificateContainer${i}-${j}>.burntPage_f>.thumb_f`)
                    .should("have.attr", "data-file", currentCertificates[i][j]);
                cy.get(`.certificateContainer${i}-${j}>.burntPage_f>.thumb_f>#${currentCertificates[i][j]}_f`)
                    .should("have.attr", "href", `../../../../assets/certificates/img/${currentCertificates[i][j]}_f.png`);
                
                    cy.get(`.certificateContainer${i}-${j}>.burntPage_b`).should("have.attr", "data-disolve", "0");
                    cy.get(`.certificateContainer${i}-${j}>.burntPage_b>.thumb_b`)
                        .should("have.attr", "data-file", currentCertificates[i][j]);
                    cy.get(`.certificateContainer${i}-${j}>.burntPage_b>.thumb_b>#${currentCertificates[i][j]}_b`)
                        .should("have.attr", "href", `../../../../assets/certificates/img/${currentCertificates[i][j]}_b.png`);
            };
        };
    });

    it("Certificate zoom buttons all present", () =>{
        cy.get(".zoomButton>svg")
            .should("have.length", certificatesLength)
            .should("not.be.visible");
    });
});

describe("Big certificates", () => {
    const assets = require("../../../../../src/assets/assets");
    const { certificates } = assets;

    it("Big certificates all display correctly, are the correct ones, and have the correct pdfs", () => {
        const currentCertificates = Object.values(certificates).flat();

        cy.get(".certificateSlot").each(($el, $idx) => {
            const {bottom} = $el[0].getBoundingClientRect();

            cy.get("main").scrollTo(0, Math.floor(bottom));

            cy.wrap($el).find(".zoomButton").click({ force: true });

            cy.wrap($el).find(".certificateContainer.fixed")
                .should("have.css", "transform", "matrix(1, 0, 0, 1, 0, 0)")
                .should("have.css", "position", "fixed")
                .should("have.css", "left", "0px")
                .should("have.css", "top", "66px")
                .should("not.have.css", "height", "320px")
                .should("have.css", "flex-direction", "row-reverse")
                .should("have.css", "z-index", "200");

            cy.wrap($el).find(".thumb_f")
                .should("be.visible")
                .should("not.have.css", "height", "320px")
                .find(`#${currentCertificates[$idx]}_f`)
                .should("have.attr", "href", `../../../../assets/certificates/img/${currentCertificates[$idx]}_f.png`)
            cy.wrap($el).find(".thumb_b")
                .should("be.visible")
                .should("not.have.css", "height", "320px")
                .find(`#${currentCertificates[$idx]}_b`)
                .should("have.attr", "href", `../../../../assets/certificates/img/${currentCertificates[$idx]}_b.png`)
            
            // !!! WORKS !!!
            // Enable if PDFs are touched in any way shape or form !!!
            // cy.wrap($el).find("#downloadPdf").click();
            cy.wrap($el).find("#downloadPdf")
                .should("be.visible")
                .should("have.attr", "href", `./assets/certificates/pdfs/${currentCertificates[$idx]}.pdf`);
            cy.wrap($el).find("#downloadPdf>")
            cy.wrap($el).find("#closeButton")
                .should("be.visible")
                .click();

            cy.wrap($el).find(".zoomButton").should("not.be.visible");
            cy.wrap($el).find("#closeButton").should("not.exist");
            cy.wrap($el).find("#downloadPdf").should("not.exist");

            cy.wrap($el).find(".certificateContainer")
                .should("have.css", "position", "relative")
                .should("have.css", "height", "320px")
                .should("have.css", "flex-direction", "row")
                .should("have.css", "z-index", "auto");

            cy.wrap($el).find(".thumb_f").should("have.css", "height").should(($height) => {
                expect(parseInt($height)).to.be.below(321);
            });
            cy.wrap($el).find(".thumb_b").should("have.css", "height").should(($height) => {
                expect(parseInt($height)).to.be.below(321);
            });
        });
    });
});
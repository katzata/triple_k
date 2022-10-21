describe("Footer tests", () => {
    it("Footer has the correct children and child count", () => {
        cy.get("footer").children().should("have.length", 3);
        cy.get("footer #hrBottom");
        cy.get("footer p");
        cy.get("footer div");
    });
});
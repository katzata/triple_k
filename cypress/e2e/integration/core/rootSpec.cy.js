describe("#root tests", () => {
    // before(() => cy.visit("http://192.168.0.185:9000/"));
    
    it("#root has the correct children and child count", () => {
        cy.get("#root").children().should("have.length", 4);
        cy.get("#root header").should("have.id", "header");
        cy.get("#root main");
        cy.get("#root footer").should("have.id", "footer");
        cy.get("#root canvas").should("have.id", "mainCanvas");
    });
});
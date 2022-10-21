describe("Header tests", () => {
    // before(() => cy.visit("http://192.168.0.185:9000/"));

    it("Header has the correct children and child count", () => {
        cy.get("header").children().should("have.length", 5);
        cy.get("header").contains("p", "KAMEN KASHCHIEV");
        cy.get("header").contains("h1", "KAMEN KASHCHIEV");
        cy.get("header").find("nav");
        cy.get("header").find("hr", "#hrTop");
        cy.get("header").find("section", "#languageBar");
    });
    
    it("Header ghost title works", () => {
        let zeroValue = "matrix(0, 0, 0, 0, 0, 0)";
        let prevValue;

        cy.get("header #headerGhostTitle")
            .should("have.css", "transform")
            .should("not.equal", zeroValue)
            .should("not.equal", undefined)
            .then(value => {
                prevValue = value;

                cy.wait(Math.floor(1000 / 30));

                cy.get("header #headerGhostTitle")
                    .should("have.css", "transform")
                    .should("not.equal", zeroValue)
                    .should("not.equal", prevValue)
                    .then(value => {
                        prevValue = value;
                        cy.wait(Math.ceil(1000 / 60));

                        cy.get("header #headerGhostTitle")
                        .should("have.css", "transform")
                        .should("not.equal", zeroValue)
                        .should("not.equal", prevValue);
                    });
            });
    });
});
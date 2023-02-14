describe("Main page tests", () => {
	it("Main has the correct children and child count", () => {
		cy.get("main").children().should("have.length", 1);
		cy.get("main").find("section", "#mainPage");
	});

	it("Main top section has the correct children", () => {
		const content = require("../../../../../src/localization/en.json").mainPage.topArticle;
		const titles = Object.values(content).map(el => el.title);
		const data = Object.values(content).map(el => el.content);

		cy.get("main .infoTitle").should("be.visible").and("contain", ...titles);
		cy.get("main .infoContent").should("be.visible").and("contain", ...data);

		cy.get("main #distortionCanvas").should("exist");
		cy.get("main #skullImage").should("exist");
		cy.get("main #mainImage").should("exist");
	});

	it("Main stack section has the correct children", () => {
		const { title, content } = require("../../../../../src/localization/en.json").mainPage.stackArticle;
		const rowTitles = Object.values(content).map(el => el.title);
		const stackIcons = require("../../../../../src/assets/assets").stackIcons;
		const iconTitles = Object.values(stackIcons).flat().map(el => el.title);

		cy.get("#stackSection h3").should("be.visible").and("contain", title);
		cy.get(".stackRow h4").should("be.visible").and("contain", ...rowTitles);
		cy.get(".stackRow .stackIcon").should("have.attr", "title", ...iconTitles).and("be.visible");
	});
});
describe("Language bar", () => {
    describe("Language bar content", () => {
        it("Language bar has the correct children and child count", () => {
            cy.get("#languageBar").children().should("have.length", 2);
            cy.get("#languageBar #langsToggle");
            cy.get("#languageBar #langsContainer");
        });
    });
    
    describe("Language bar toggle", () => {
        it("Language bar opens and closes correctly", () => {
            cy.get("#languageBar #langsToggle").trigger("click");
            cy.wait(200);
            cy.get("#languageBar").should("have.css", "width", "263px");
    
            cy.get("#languageBar #langsToggle").trigger("click");
            cy.wait(200);
            cy.get("#languageBar").should("have.css", "width", "30px");
        });
    });
    
    describe("Language bar arrow", () => {
        it("Language bar arrow switches points correctly", () => {
            cy.get("#languageBar #langsToggle").trigger("click");
            cy.wait(200);
            cy.get("#langsToggle svg #toggleArrow")
                .should("have.attr", "points")
                .should(($points) => {
                    expect($points).to.satisfy(function testPoints() {
                        return $points === "13 13 80 150 13 287" || $points === "13,13 80,150 13,287";
                    });
                });
    
            cy.get("#languageBar #langsToggle").trigger("click");
            cy.wait(200);
            cy.get("#langsToggle svg #toggleArrow")
                .should("have.attr", "points")
                .should(($points) => {
                    expect($points).to.satisfy(function testPoints() {
                        return $points === "80 13 13 150 80 287" || $points === "80,13 13,150 80,287";
                    });
                });
        });
    });

    describe("Language change", () => {
        it("Language changes correctly on all dynamic pages and core components EN -> BG -> IT -> EN", () => {
            checkCoreElementsLang("EN");
            cy.get("#languageBar #langsToggle").trigger("click");
            cy.wait(200);
            cy.get("#languageBar .langButton").contains("BG").click({force: true});
            checkMainCanvasTransition();

            checkCoreElementsLang("BG");
            cy.get("#languageBar #langsToggle").trigger("click");
            cy.wait(200);
            cy.get("#languageBar .langButton").contains("IT").click({force: true});
            checkMainCanvasTransition();

            checkCoreElementsLang("IT");
            cy.get("#languageBar #langsToggle").trigger("click");
            cy.wait(200);
            cy.get("#languageBar .langButton").contains("EN").click({force: true});
            checkMainCanvasTransition();

            checkCoreElementsLang("EN");
        });
    });
});

const projects = require("../../../../../src/assets/portfolio/portfolio.json");

function checkMainCanvasTransition() {
    cy.get("#mainCanvas")
        .should("be.visible")
        .should("have.css", "zIndex", "400");
    
    cy.wait(700);

    checkCoreElementsVisibility("0");
    
    cy.get("#mainCanvas")
        .should("not.be.visible")
        .should("have.css", "zIndex", "-1");
    
    cy.wait(700);
    
    checkCoreElementsVisibility("1");
};

function checkCoreElementsVisibility(opacity) {
    cy.get("header").should("have.css", "opacity", opacity);
    cy.get("main").should("have.css", "opacity", opacity);
    cy.get("footer").should("have.css", "opacity", opacity);
};

function checkCoreElementsLang(lang) {
    const bg = require("../../../../../src/localization/bg.json");
    const en = require("../../../../../src/localization/en.json");
    const it = require("../../../../../src/localization/it.json");

    const langs = {
        BG: {
            header: {
                title: bg.header.title,
                ghostTitle: bg.header.title,
                navSectionTitle: [bg.header.nav.navL.title, bg.header.nav.navR.title],
                navLinks: [...Object.keys(bg.header.nav.navL.content), bg.header.nav.main.title, ...Object.keys(bg.header.nav.navR.content)],
            }
        },
        EN: {
            header: {
                title: en.header.title,
                ghostTitle: en.header.title,
                navSectionTitle: [en.header.nav.navL.title, en.header.nav.navR.title],
                navLinks: [...Object.keys(en.header.nav.navL.content), en.header.nav.main.title, ...Object.keys(en.header.nav.navR.content)],
            }
        },
        IT: {
            header: {
                title: it.header.title,
                ghostTitle: it.header.title,
                navSectionTitle: [it.header.nav.navL.title, it.header.nav.navR.title],
                navLinks: [...Object.keys(it.header.nav.navL.content), it.header.nav.main.title, ...Object.keys(it.header.nav.navR.content)],
            }
        }
    };
    
    header();
    footer();
    checkPagesLang(lang, [langs[lang].header.navLinks[0], langs[lang].header.navLinks[2], langs[lang].header.navLinks[3]]);
    
    function header() {
        cy.get("#headerTitle").should("have.text", langs[lang].header.title);
        cy.get("#headerGhostTitle").should("have.text", langs[lang].header.ghostTitle);
    
        for (const navTitle of langs[lang].header.navSectionTitle) {
            cy.get(".navSectionTitle").contains(navTitle);
        };
    
        for (const navLink of langs[lang].header.navLinks) {
            cy.get(".navLinks").contains(navLink);
        };
    };

    function footer() {
        // for (const infoTitle of langs[lang].mainPage.infoTitles) {
        //     cy.get(".infoTitle").contains(infoTitle);
        // };

        // for (const content of langs[lang].mainPage.infoContent) {
        //     cy.get(".infoContent").contains(content);
        // };

        // for (const content of langs[lang].mainPage.stackTitles) {
        //     cy.get(".stackRow h4").contains(content);
        // };
    };
};

function checkPagesLang(lang, pages) {
    const bg = require("../../../../../src/localization/bg.json");
    const en = require("../../../../../src/localization/en.json");
    const it = require("../../../../../src/localization/it.json");
    const [certificatesLink, mainLink, projectsLink] = pages;
    const age = () => {
		let age = Date.now() - new Date(1985, 4, 3).getTime();
		let ageDate = new Date(age);

		return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
	};

    const langs = {
        BG: {
            mainPage: {
                infoTitles: Object.values(bg.mainPage.topArticle).map(el => el.title),
                infoContent: Object.values(bg.mainPage.topArticle).map(el => el.content === "getAge" ? age() : el.content),
                stackTitles: Object.values(bg.mainPage.stackArticle.content).map(el => el.title)
            },
            certificatesPage: {
                pageTitle: bg.certificatesSection.title,
                rowTitles: Object.values(bg.certificatesSection.sections).map(el => el.title)
            },
            projectsPage: {
                pageTitle: bg.projectsSection.title,
                content: bg.projectsSection.content
            }
        },
        EN: {
            mainPage: {
                infoTitles: Object.values(en.mainPage.topArticle).map(el => el.title),
                infoContent: Object.values(en.mainPage.topArticle).map(el => el.content === "getAge" ? age() : el.content),
                stackTitles: Object.values(en.mainPage.stackArticle.content).map(el => el.title)
            },
            certificatesPage: {
                pageTitle: en.certificatesSection.title,
                rowTitles: Object.values(en.certificatesSection.sections).map(el => el.title)
            },
            projectsPage: {
                pageTitle: en.projectsSection.title,
                content: en.projectsSection.content
            }
        },
        IT: {
            mainPage: {
                infoTitles: Object.values(it.mainPage.topArticle).map(el => el.title),
                infoContent: Object.values(it.mainPage.topArticle).map(el => el.content === "getAge" ? age() : el.content),
                stackTitles: Object.values(it.mainPage.stackArticle.content).map(el => el.title)
            },
            certificatesPage: {
                pageTitle: it.certificatesSection.title,
                rowTitles: Object.values(it.certificatesSection.sections).map(el => el.title)
            },
            projectsPage: {
                pageTitle: it.projectsSection.title,
                content: it.projectsSection.content
            }
        }
    };

    mainPage();
    changePage(certificatesLink);
    certificatesPage();
    changePage(projectsLink);
    projectsPage();
    changePage(mainLink);

    function mainPage() {
        for (const infoTitle of langs[lang].mainPage.infoTitles) {
            cy.get(".infoTitle").contains(infoTitle);
        };

        for (const content of langs[lang].mainPage.infoContent) {
            cy.get(".infoContent").contains(content);
        };

        for (const content of langs[lang].mainPage.stackTitles) {
            cy.get(".stackRow h4").contains(content);
        };
    };

    function certificatesPage() {
        cy.get("#certificatesPage>h2").contains(langs[lang].certificatesPage.pageTitle);

        for (const item of langs[lang].certificatesPage.rowTitles) {
            cy.get(".rowWrapper>h3").contains(item);
        };
    };

    function projectsPage() {
        cy.get("#projectsPage>h2").contains(langs[lang].projectsPage.pageTitle);

        cy.get(".containerWrapper").each(($el, $idx) => {
            cy.wrap($el).find("h4").should("have.text", projects[$idx].details.en.title);
            
            cy.wrap($el).find(".linksContainer>a").should("exist");
            
            cy.wrap($el).find(".description").should("exist");
        });
    };

    function changePage(link) {
        cy.get(".navLinks").contains(link).click({force: true});
        cy.wait(1600);
    };
};

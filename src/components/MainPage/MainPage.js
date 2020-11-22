import "./MainPage.css";
import MainSection from "../MainSection/MainSection";
import CvSection1 from "../CvSection1/CvSection1";
import CvSection2 from "../CvSection2/CvSection2";
import CvSection from "../CvSection1/CvSection1";
import CertificatesSection from "../CertificatesSection/CertificatesSection";
import PortfolioSection from "../PortfolioSection/PortfolioSection";

const Content = require("../../assets/assets.json");

let canvas;
let ctx;

const crack = new Image();
crack.src = Content.canvas.crack;

const humanShape = new Image();
humanShape.src = Content.canvas.humanShape;

const mainSection = new MainSection();
const cvSection1 = new CvSection1();
const cvSection2 = new CvSection2();
const certificatesSection = new CertificatesSection();
const portfolioSection = new PortfolioSection();

class MainPage {
	constructor() {
		this.pagePrepared = false;
		this.renderSection = false;
		this.miniIntroDone = false;

		this.counters = {
			main: 0,
			humanShape: 0
		}

		this.language = "en";

		this.content = {
			pageContainer: document.querySelector(".pageContainer"),
			header: document.querySelector("header"),
			logo: document.querySelector(".logo"),
			title1: document.querySelector(".headerTitle"),
			title2: document.querySelector(".headerTitle2"),
			main: document.querySelector("main"),
			nav: document.querySelector("nav"),
			navSections: document.querySelectorAll(".navSections"),
			navSectionL: document.querySelector(".navSectionL"),
			navSectionR: document.querySelector(".navSectionR"),
			navButtonsL: document.querySelectorAll(".navSectionLButton"),
			navButtonsR: document.querySelectorAll(".navSectionRButton"),
			navButtons: document.querySelectorAll(".navButtons"),
			navButtonMain: document.querySelector(".navButtonMain"),
			hrTop: document.querySelector(".hrTop"),
			mainSection: document.querySelector(".mainSection"),
			hrBottom: document.querySelector(".hrBottom"),
			footer: document.querySelector("footer"),
			footerText: document.querySelector(".footerText")
		}

		this.navOver = {
			left: false,
			right: false
		}

		this.crack = {
			width: 0,
			height: 0,
			cover: window.innerWidth
		}

		this.humanShape = {
			displaying: false,
			gotCoords: false,
			fadeIn: true,
			fadeInDelay: 6000,
			coords: [window.innerWidth * .10, window.innerHeight - window.innerHeight * .20],
			minX: .10,
			minY: .24,
			maxX: .90,
			maxY: .79,
			height: 0,
			heightMultiplyer: 12,
			heightRange: 12,
			alpha: 0,
			alphaIncrement: .025,
			closeDelay: 0,
			index: 0,
			frames: [
				[0, 0, 64, 128],
				[0, 128, 64, 128],
				[64, 128, 64, 128],
				[64, 0, 64, 128],
				[64, 128, 64, 128],
				[0, 128, 64, 128],
				[0, 0, 64, 128]
			],
		}

		this.stages = {
			first: 22,
			second: 100,
			third: 154,
			fourth: 200
		}
		
		this.opacity = {
			increment: .015,
			header: 0,
			main: 0,
			footer: 0
		}

		this.sections = {
			current: "",
			transitioning: {
				fadeOut: false,
				done: true
			},
			content: {
				mainSection: mainSection,
				cvSection1: cvSection1,
				cvSection2: cvSection2,
				certificatesSection: certificatesSection,
				portfolioSection: portfolioSection
			}
		};
	}

	init() {
		canvas = document.querySelector("canvas");
		ctx = canvas.getContext('2d');

		this.content.navButtonMain.addEventListener("transitionend", () => {
			if (this.content.navButtonMain.style.opacity === "0") this.content.navButtonMain.style.transform = "translateY(60%) scale(0)";
		})

		this.handleLanguage("init");
		this.content.footerText.appendChild(document.createTextNode(`Copywright © ${new Date().getFullYear()}`));
	}

	handlePageWidth() {
		// document.querySelector("main").style.width = `${window.innerWidth + 17}px`;
		// document.querySelector("main").style.paddingRight = "17px";
		// console.log(document.querySelector(".mainSection").style.width, window.innerWidth)
	}

	handleEntryStages(stage) {
		if (this.opacity.header < 1 && this.counters.main >= this.stages.first) {
			this.content.pageContainer.style.opacity = "1";
		}

		if (stage === 2) {
			this.content.pageContainer.style.height = "100vh";
		}

		if (stage === 3) {
			this.content.footer.style.boxShadow = "0 0 28px 25px black";
			this.content.footerText.style.transform = "translateY(0vh)";

			this.content.footer.addEventListener("transitionend", () => {
				if (this.content.footerText.style.transform === "translateY(0vh)") {
					this.content.footer.style.backgroundColor = `rgba(0, 0, 0, .8)`;
				}
			})
		}

		if (stage === 4) {
			this.content.pageContainer.style.transitionDuration = "0s";
			this.content.nav.style.opacity = "1";
			this.miniIntroDone = true;
		}
	}

	handleMiniIntro() {
		if (this.opacity.header < 1 && this.counters.main >= this.stages.first) {
			this.handleEntryStages(1);
		}

		if (this.content.pageContainer.style.height !== "100%" && this.counters.main >= this.stages.second) {
			this.handleEntryStages(2);
		}

		if (this.counters.main === this.stages.third) {
			this.handleEntryStages(3);
		}

		if (this.counters.main === this.stages.fourth) {
			this.handleEntryStages(4);
		}
	}

	handleLanguage(action, language) {
		if (action === "init") {
			for (let i = 0; i < Content.languages.length; i++) {
				if (window.navigator.language.includes(Content.languages[i])) {
					this.language = Content.languages[i];
				}
			}
		} else {
			if (this.language !== language) {
				this.language = language;
			}
		}
	}

	firstTimeOpenSection() {
		this.openSection(
			{
				titles: Object.keys(this.sections.content),
				actual: Object.values(this.sections.content)
			}, 
			"mainSection"
		);

		if (!this.renderSection) {
			this.renderSection = mainSection.states.displaying;
		}
	}

	openSection(sections, section) {
		for (let i = 0; i < sections.titles.length; i++) {
			if (sections.titles[i] === section) {
				sections.actual[i].render(this.language);
				this.sections.current = sections.titles[i];
			} else {
				const presentSections = document.querySelectorAll(".sections");
			}
		}
	}

	closeSection(sections, section) {
		for (let i = 0; i < sections.titles.length; i++) {
			if (sections.titles[i] !== section && sections.actual[i].states.displaying) {
				sections.actual[i].handleFade(false);
			}
		}
	}

	changeSections(section) {
		const sections = {
			titles: Object.keys(this.sections.content),
			actual: Object.values(this.sections.content)
		};

		if (this.sections.current !== section) {
			this.closeSection(sections, section);

			setTimeout(() => {
				this.openSection(sections, section);
			}, 600);
		}

		this.handleNavMainButton(section);
	}

	handleNavHover() {
		for (let i = this.content.navSections.length - 1; i >= 0; i--) {
			this.content.navSections[i].addEventListener("mouseenter", () => {
				if (this.content.navSections[i].className.includes("navSectionL")) {
					this.content.navSections[i].style.height = "82px";
					
					if (!this.navOver.left) {
						this.navOver.left = true;
						this.handleNavSections("left", this.navOver.left);
					}
					
				} else {
					this.content.navSections[i].style.height = "62px";

					if (!this.navOver.right) {
						this.navOver.right = true;
						this.handleNavSections("right", this.navOver.right);
					}
				}
			})

			this.content.navSections[i].addEventListener("mouseleave", () => {
				if (this.content.navSections[i].className.includes("navSectionL")) {
					this.content.navSections[i].style.height = "18px";

					if (this.navOver.left) {
						this.navOver.left = false;
						this.handleNavSections("left", this.navOver.left);
					}
				} else {
					this.content.navSections[i].style.height = "18px";

					if (this.navOver.right) {
						this.navOver.right = false;
						this.handleNavSections("right", this.navOver.right);
					}
				}
			})

			this.content.navSections[i].addEventListener("touchend", () => {
				if (this.content.navSections[i].className.includes("navSectionL")) {
					if (!this.navOver.left) {
						this.navOver.left = true;
						this.handleNavSections("left", this.navOver.left);
					} else {
						this.navOver.left = false;
						this.handleNavSections("left", this.navOver.left);
					}
				} else {
					if (!this.navOver.right) {
						this.navOver.right = true;
						this.handleNavSections("right", this.navOver.right);
					} else {
						this.navOver.right = false;
						this.handleNavSections("right", this.navOver.right);
					}
				}
			})
		}
	}

	handleNavSections(section, hovering) {
		if (section === "left") {
			const itemsLeft = document.querySelectorAll(".navSectionLButton");
			
			if (hovering) {
				for (let i = 0; i < itemsLeft.length; i++) {
					itemsLeft[i].style.transform = `translateY(${20 * (i + 1) + 2}px)`;
					itemsLeft[i].style.boxShadow = "0 0 9px 7px black";
				}
			}

			if (!hovering) {
				for (let i = 0; i < itemsLeft.length; i++) {
					itemsLeft[i].style.transform = "translateY(0px)";
					itemsLeft[i].style.boxShadow = "none";
				}
			}
		} else {
			const itemsRight = document.querySelectorAll(".navSectionRButton");
			
			if (hovering) {
				for (let i = 0; i < itemsRight.length; i++) {
					itemsRight[i].style.transform = `translateY(${20 * (i + 1) + 2}px)`;
					itemsRight[i].style.boxShadow = "0 0 9px 7px black";
				}
			}

			if (!hovering) {
				for (let i = 0; i < itemsRight.length; i++) {
					itemsRight[i].style.transform = "translateY(0px)";
					itemsRight[i].style.boxShadow = "none";
				}
			}
		}
	}

	handleNavButtons() {
		for (let i = 0; i < this.content.navButtons.length; i++) {
			this.content.navButtons[i].addEventListener("mouseenter", () => {
				this.content.navButtons[i].style.textShadow = "0 0 8px white";
				this.content.navButtons[i].style.color = "white";
				
				if (this.content.navButtons[i].dataset.section !== "mainSection") {
					this.content.navButtons[i].style.fontSize = "14px";
					this.content.navButtons[i].style.lineHeight = "14px";
				}
			});

			this.content.navButtons[i].addEventListener("mouseleave", () => {
				this.content.navButtons[i].style.textShadow = "none";
				this.content.navButtons[i].style.color = "#EEEEEE";
				
				if (this.content.navButtons[i].dataset.section !== "mainSection") {
					this.content.navButtons[i].style.fontSize = "13px";
					this.content.navButtons[i].style.lineHeight = "13px";
				}
			});

			this.content.navButtons[i].addEventListener("click", () => {
				this.changeSections(this.content.navButtons[i].dataset.section);
			})
		}
	}

	handleNavMainButton(section) {
		if (section !== "mainSection") {
			this.content.navButtonMain.style.transform = "translateY(60%) scale(1)";
			this.content.navButtonMain.style.opacity = "1";
		} else {
			this.content.navButtonMain.style.transform = "translateY(60%) scale(0)";
			this.content.navButtonMain.style.opacity = "0";
		};
	}

	handleCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		this.crack.width = canvas.height * crack.height / crack.width;
		this.crack.height = canvas.width * crack.height / crack.width;
	}

	handleCrack() {
		if (this.crack.cover > 0) this.crack.cover -= canvas.width / 2;

		ctx.save();
		ctx.globalAlpha = .9;
		ctx.translate(-canvas.width / 2, -this.crack.height / 2);
		ctx.drawImage(crack, canvas.width / 2, canvas.height / 2, canvas.width, this.crack.height);
		ctx.restore();

		ctx.beginPath();
		ctx.rect(0, 0, this.crack.cover, canvas.height);
		ctx.fillRect(0, 0, this.crack.cover, canvas.height);
		ctx.stroke();
	}

	humanShapeOffset(multiplier) {
		return {
			x: Math.ceil(Math.random() * multiplier),
			y: Math.ceil(Math.random() * multiplier)
		}
	}

	humanShapeCoords() {
		let x = Number(Math.random().toFixed(2));
		let y = Number(Math.random().toFixed(2));

		this.humanShape.coords = [
			canvas.width * (x < this.humanShape.minX ? this.humanShape.minX : x > this.humanShape.maxX ? this.humanShape.maxX : x),
			canvas.height * (y < this.humanShape.minY ? this.humanShape.minY : y > this.humanShape.maxY ? this.humanShape.maxY : y)
		]
	}

	humanShapeAlpha() {
		if (this.humanShape.closeDelay === 20) {
			this.humanShape.fadeIn = false;
		}

		if (this.humanShape.fadeIn) {
			if (this.humanShape.alpha < .85) {
				this.humanShape.alpha += this.humanShape.alphaIncrement
			} else {
				this.humanShape.closeDelay++;
			};
		} else {
			if (this.humanShape.alpha > this.humanShape.alphaIncrement) {
				this.humanShape.alpha -= this.humanShape.alphaIncrement;
			} else {
				this.humanShape.gotCoords = false;
				this.humanShape.fadeIn = true;
				this.humanShape.closeDelay = 0;
				this.humanShape.alpha = 0;
				this.humanShape.displaying = false;

				this.humanShapeDelay();
			};
		}
	}

	humanShapeDelay() {
		const delay = this.humanShape.fadeInDelay + Math.floor(Math.random() * this.humanShape.fadeInDelay);
		
		setTimeout(() => {
			this.humanShape.displaying = true;
		}, delay);
	}

	humanShapeHeight() {
		this.humanShape.height = Math.floor(Math.random() * this.humanShape.heightMultiplyer + this.humanShape.heightRange);
	}

	handleHumanShape() {
		this.counters.humanShape++;

		if (!this.humanShape.gotCoords) {
			this.humanShapeCoords();
			this.humanShapeHeight();
			this.humanShape.gotCoords = true;
		};

		if (this.counters.humanShape === 4) {
			this.humanShape.index++;
			this.counters.humanShape = 0;
			this.humanShapeAlpha();
			
			if (this.humanShape.index > this.humanShape.frames.length - 1) this.humanShape.index = 0;
		}

		ctx.save();
		ctx.globalAlpha = this.humanShape.alpha;
		ctx.translate(-canvas.width / 16 - this.humanShapeOffset(5).x, -canvas.height / 12 - this.humanShapeOffset(5, this.counters.humanShape).y);
		ctx.drawImage(humanShape, ...this.humanShape.frames[this.humanShape.index], this.humanShape.coords[0], this.humanShape.coords[1], canvas.height / this.humanShape.height, (canvas.height / this.humanShape.height) * 2);
		ctx.restore();
	}

	handleImageCanvas(trigger) {
		mainSection.handleCanvas(trigger);
		mainSection.handleTitleTextShadow();
		portfolioSection.handleInfoScrolling();
	}

	render() {
		if (!this.pagePrepared) {
			this.init();
			this.pagePrepared = true;
		} else {
			this.counters.main++;
		}

		if (!this.miniIntroDone) {
			this.handleMiniIntro();
			this.handleNavHover();
			this.handleNavButtons();
		} else {
			this.firstTimeOpenSection();
			
			setTimeout(() => {
				this.humanShape.displaying = true;
			}, 8000)
		}

		this.handleCanvas();
		this.handleCrack();
	}
}

// window.onwheel = (e) => {
// 	console.log(e.deltaY)
// }

/*window.ontouchstart = (e) => {
	alert(window.navigator.language)
}*/

window.onclick = () => {

}

export default MainPage;
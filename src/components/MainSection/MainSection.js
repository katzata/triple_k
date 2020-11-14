import "./MainSection.css";
import Assets from "../PageContent/assets.json";

const kkk = require("../../assets/img/kkk.png");

class MainSection {
	constructor() {
		this.states = {
			prepared: false,
			displaying: false
		}

		this.text;

		this.icons = {
			html: undefined,
			css: undefined,
			sass: undefined,
			bootstrap: undefined,
			js: undefined,
			jquery: undefined,
			pixi: undefined,
			react: undefined,
			webpack: undefined,
			node: undefined,
			git: undefined
		}

		this.content = {
			nav: undefined,
			mainSection: undefined,
			topArticle: undefined,
			articleSubTitle: undefined,
			topArticleText: undefined,
		}
	}

	setLanguage(language) {
		this.text = require(`../PageContent/${language}.json`);
	}

	init() {
		const mainSection = document.createElement("section");
		mainSection.classList.add("mainSection", "sections");
		this.content.mainSection = mainSection;

		this.handleTopArticle(mainSection);
		this.handleMiddleArticle(mainSection);
		this.handleBottomArticle(mainSection);

		document.querySelector("main").appendChild(mainSection);

		this.handleWidths();
		this.content.nav = document.querySelector("nav");
		this.content.topArticle = document.querySelector(".topArticle");

		this.handleListeners();

		this.states.prepared = true;
	}

	getAge() {
		let age = Date.now() - new Date(1985, 4, 3).getTime();
		let ageDate = new Date(age);

		return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
	}

	handleListeners() {
		this.content.mainSection.addEventListener("transitionend", () => {
			if (this.content.mainSection.style.opacity === "1") {
				// this.content.mainSection.style.overflowY = "auto";
			}

			if (this.content.mainSection.style.opacity === "0") {
				this.content.mainSection.style.transform = "scaleY(0)";
				this.states.displaying = false;
			}
		})
	}

	handleWidths() {
		for (let i = 0; i < document.querySelectorAll(".skillThemeBText").length; i++) {
			document.querySelectorAll(".skillThemeA")[i].style.width = "60px";
			document.querySelectorAll(".skillThemeBText")[i].style.width = `${document.querySelectorAll(".skillThemeA")[i].offsetWidth}px`;
		}
	}

	handleTopArticle(mainSection) {
		const topArticleContainer = document.createElement("div");
		topArticleContainer.classList.add("topArticleContainer");
		this.content.topArticleContainer = topArticleContainer;

		const topArticle = document.createElement("article");
		topArticle.classList.add("topArticle");
		this.content.topArticle = topArticle;

		Object.values(this.text.mainSection.topArticle).map((text, idx) => {
			let articleSubTitle = document.createElement("div");
			articleSubTitle.classList.add("articleSubTitle");
			
			let topArticleTitle = document.createElement("p");
			topArticleTitle.textContent = text.title;
			topArticleTitle.classList.add("topArticleLetters");
			articleSubTitle.appendChild(topArticleTitle);

			let topArticleText = document.createElement("div");
			topArticleText.classList.add("topArticleText", `topArticleText${idx + 1}`);

			let topArticleContent = document.createElement("p");
			topArticleContent.textContent = text.content === "getAge" ? this.getAge() : text.content;
			topArticleContent.classList.add("topArticleLetters");
			topArticleText.appendChild(topArticleContent);

			const topArticleHr = document.createElement("hr");
			topArticleHr.classList.add("topArticleHr");
			articleSubTitle.appendChild(topArticleHr);

			topArticle.appendChild(articleSubTitle);
			topArticle.appendChild(topArticleText);
		});

		this.content.articleSubTitle = document.querySelectorAll(".articleSubTitle");
		this.content.topArticleText = document.querySelectorAll(".topArticleText");

		const topArticleImg = document.createElement("img");
		topArticleImg.classList.add("topArticleImg");
		topArticleImg.src = kkk.default;
		this.content.topArticleImg = topArticleImg;

		topArticleContainer.appendChild(topArticle);
		topArticleContainer.appendChild(topArticleImg);
		this.content.mainSection.appendChild(topArticleContainer);
	}

	handleMiddleArticle(mainSection) {
		const middleArticle = document.createElement("div");
		middleArticle.classList.add("middleArticle");

		const articleTitle = document.createElement("h2");
		articleTitle.classList.add("articleTitle");
		articleTitle.textContent = `${this.text.mainSection.middleArticle.title}`;
		middleArticle.appendChild(articleTitle);

		const skillsContainer = document.createElement("div");
		skillsContainer.classList.add("skillsContainer");
		middleArticle.appendChild(skillsContainer);

		for (let i = 0; i < Assets.icons.src.length; i++) {
			const container = document.createElement("div");
			container.classList.add("iconContainer");

			const icon = document.createElement("img");
			icon.classList.add("icon", `icon-${i}`);
			icon.src = Assets.icons.src[i];
			icon.alt = `${Assets.icons.titles[i]}`;
			container.appendChild(icon);

			const iconOverlay = document.createElement("div");
			iconOverlay.classList.add("iconOverlay");
			container.appendChild(iconOverlay);

			const iconTitle = document.createElement("p");
			iconTitle.classList.add("iconTitle", `iconTitle-${i}`);
			iconTitle.textContent = `${Assets.icons.titles[i]}`;
			iconTitle.dataset.index = `${i}`;
			container.appendChild(iconTitle);

			skillsContainer.appendChild(container);

			container.addEventListener("mouseover", () => {
				this.handleIconsHover(true, iconTitle, iconOverlay);
			})

			container.addEventListener("mouseleave", () => {
				this.handleIconsHover(false, iconTitle, iconOverlay);
			})
		}

		mainSection.appendChild(middleArticle);
	}

	handleBottomArticle(mainSection) {
		const bottomArticle = document.createElement("section");
		bottomArticle.classList.add("bottomArticle");
		this.content.bottomArticle = bottomArticle;

		const articleSubTitle = document.createElement("div");
		articleSubTitle.classList.add("articleSubTitle");
		this.content.articleSubTitle = articleSubTitle;

		let bottomArticleTitle = document.createElement("p");
		bottomArticleTitle.textContent = this.text.mainSection.bottomArticle.title;
		bottomArticleTitle.classList.add("bottomArticleTitle");
		articleSubTitle.appendChild(bottomArticleTitle);

		const bottomArticleHr = document.createElement("hr");
		bottomArticleHr.classList.add("bottomArticleHr");
		articleSubTitle.appendChild(bottomArticleHr);

		bottomArticle.appendChild(articleSubTitle);

		let bottomArticleContent = document.createElement("p");
		bottomArticleContent.textContent = this.text.mainSection.bottomArticle.content;
		bottomArticleContent.classList.add("bottomArticleText");
		bottomArticle.appendChild(bottomArticleContent);

		this.content.mainSection.appendChild(bottomArticle);
	}

	handleIconsHover(hovering, icon, overlay) {
		if (hovering) {
			icon.style.transform = "scale(1, 1) translateY(0%)";
			icon.style.zIndex = "1";
			overlay.style.opacity = "1";
		} else {
			if (Number(icon.dataset.index) < 5) {
				icon.style.transform = "scale(0, 0) translateY(-120%)";
				icon.style.zIndex = "-1";
			} else if (Number(icon.dataset.index) === 5) {
				icon.style.transform = "scale(0, 0) translateX(-120%)";
			} else {
				icon.style.transform = "scale(0, 0) translateY(120%)";
				icon.style.zIndex = "-1";
			}

			overlay.style.opacity = "0";
		}
	}

	handleFade(state) {
		if (state) {
			this.content.mainSection.style.transform = "scaleY(1)";
			this.content.mainSection.style.opacity = "1";
		} else {
			this.content.mainSection.style.opacity = "0";
		}
	}

	render(language) {
		if (!this.states.prepared) {
			this.setLanguage(language);
			this.init();
		} else {
			if (!this.states.displaying) {
				this.handleFade(true);
				this.states.displaying = true;
			}
		}
	}
}

window.ontouchend = () => {
	// alert(window.innerWidth);
}

export default MainSection;
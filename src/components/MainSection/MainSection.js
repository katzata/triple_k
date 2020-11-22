import "./MainSection.css";
import Assets from "../../assets/assets.json";
import noiseAnimation from "../../assets/gfx/img/noise.json";

// const noiseAnimation = require(`${Assets.animations.noise}`);

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
			canvas: undefined,
			ctx: undefined,
			articleSubTitleContainer: undefined,
			topArticleText: undefined,
		}

		this.img = {
			kkk: new Image(),
			whiteNoise: new Image(),
		}

		this.kkk = {
			togle: false,
			alpha: 1
		}

		this.shadowAnimation = {
			counter: 0,
			frame: 0,
			coords: [
				["4", "4"],
			]
		}

		this.noiseAnimation = {
			noiseAnimation: undefined,
			frameCount: 0,
			overallCount: 0,
			frame: 0,
			toggle: true,
			alpha: 0,
			alphaIncrement: .0022
		}
	}

	setLanguage(language) {
		this.text = require(`../../assets/localisation/${language}.json`);
	}

	init() {
		const mainSection = document.createElement("section");
		mainSection.classList.add("mainSection", "sections");
		this.content.mainSection = mainSection;

		this.prepareTopArticle(mainSection);
		this.prepareMiddleArticle(mainSection);
		this.prepareBottomArticle(mainSection);

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

	prepareTopArticle(mainSection) {
		const topArticleContainer = document.createElement("div");
		topArticleContainer.classList.add("topArticleContainer");
		this.content.topArticleContainer = topArticleContainer;

		const topArticle = document.createElement("article");
		topArticle.classList.add("topArticle");
		this.content.topArticle = topArticle;

		Object.values(this.text.mainSection.topArticle).map((text, idx) => {
			let articleSubTitleContainer = document.createElement("div");
			articleSubTitleContainer.classList.add("articleSubTitleContainer");
			
			let topArticleTitle = document.createElement("p");
			topArticleTitle.textContent = text.title;
			topArticleTitle.classList.add("topArticleLetters");
			articleSubTitleContainer.appendChild(topArticleTitle);

			let articleTextContainer = document.createElement("div");
			articleTextContainer.classList.add("articleTextContainer", `topArticleText${idx + 1}`);

			let topArticleContent = document.createElement("p");
			topArticleContent.textContent = text.content === "getAge" ? this.getAge() : text.content;
			topArticleContent.classList.add("topArticleLetters");
			articleTextContainer.appendChild(topArticleContent);

			const topArticleHr = document.createElement("hr");
			topArticleHr.classList.add("topArticleHr");
			articleSubTitleContainer.appendChild(topArticleHr);

			topArticle.appendChild(articleSubTitleContainer);
			topArticle.appendChild(articleTextContainer);
		});

		this.content.articleSubTitleContainer = document.querySelectorAll(".articleSubTitleContainer");
		this.content.articleTextContainer = document.querySelectorAll(".articleTextContainer");

		// const topArticleImg = document.createElement("img");
		// topArticleImg.classList.add("topArticleImg");
		// topArticleImg.src = kkk.default;
		// this.content.topArticleImg = topArticleImg;

		topArticleContainer.appendChild(topArticle);
		this.prepareCanvas(topArticleContainer);

		// topArticleContainer.appendChild(topArticleImg);
		this.content.mainSection.appendChild(topArticleContainer);
	}

	prepareCanvas(target) {
		this.img.kkk.src = Assets.canvas.kkk;
		this.img.whiteNoise.src = Assets.canvas.noise;

		const canvas = document.createElement("canvas");
		canvas.classList.add("imageCanvas");
		this.content.canvas = canvas;

		this.content.ctx = canvas.getContext("2d");
		target.appendChild(canvas);

		this.img.noiseAnimation = Assets.animations.noise;

		this.handleCanvas();
	}

	handleCanvas(trigger) {
		if (this.states.displaying) {
			const width = window.innerWidth / 4;
			const height = window.innerWidth / 4 * 277 / 190;

			this.content.canvas.width = width;
			this.content.canvas.height = height;

			this.content.ctx.save();
			this.content.ctx.globalAlpha = this.kkk.Alpha;
			this.content.ctx.clearRect(0, 0, width, height);
			this.content.ctx.drawImage(this.img.kkk, 0, 0, 190, 277, 0, 0, this.content.canvas.width, this.content.canvas.height);
			this.content.ctx.restore();

			if (trigger) {
				this.handleNoiseAnimation(trigger);
			} else {
				if (this.noiseAnimation.overallCount !== 0) this.noiseAnimation.overallCount = 0;
			}
		}
	}

	handleKKKAlpha() {
		if (this.noiseAnimation.alpha > .15) {
			this.kkk.toggle = true;
		} else {
			if (this.kkk.toggle) this.kkk.toggle = false;
		}
		
		if (this.kkk.toggle) {
			this.kkk.Alpha = .6 + Math.random();
		} else {
			if (this.kkk.Alpha !== 1) this.kkk.Alpha = 1;
		}
	}

	handleNoiseAnimation(trigger) {
		this.content.ctx.save();
		this.handleNoiseAnimationAlpha(.2);
		this.content.ctx.globalAlpha = this.noiseAnimation.alpha;
		this.content.ctx.drawImage(this.img.whiteNoise, Object.values(noiseAnimation)[this.noiseAnimation.frame].x, Object.values(noiseAnimation)[this.noiseAnimation.frame].y, 190, 277, 0, 0, this.content.canvas.width, this.content.canvas.height);
		this.content.ctx.restore();

		this.noiseAnimation.frameCount++;

		if (this.noiseAnimation.frameCount === 2) {
			this.noiseAnimation.frame++;
			this.noiseAnimation.frameCount = 0;

			if (this.noiseAnimation.frame === Object.values(noiseAnimation).length - 1) {
				this.noiseAnimation.frame = 0;
			}
		}
	}

	handleNoiseAnimationAlpha(maxAlpha) {
		this.noiseAnimation.overallCount++;

		if (this.noiseAnimation.overallCount > 280) {
			this.noiseAnimation.toggle = false;
		} else {
			this.noiseAnimation.toggle = true;
		};

		if (this.noiseAnimation.toggle) {
			if (this.noiseAnimation.alpha < maxAlpha) {
				this.noiseAnimation.alpha += this.noiseAnimation.alphaIncrement;
			}
		} else {
			if (this.noiseAnimation.alpha > .01) {
				this.noiseAnimation.alpha += -this.noiseAnimation.alphaIncrement;
			}
		}
		
		this.handleKKKAlpha();
	}

	prepareMiddleArticle(mainSection) {
		const middleArticle = document.createElement("div");
		middleArticle.classList.add("middleArticle");

		const articleTitle = document.createElement("h2");
		articleTitle.classList.add("articleTitle");
		articleTitle.textContent = `${this.text.mainSection.middleArticle.title}`;
		middleArticle.appendChild(articleTitle);

		const techStackContainer = document.createElement("div");
		techStackContainer.classList.add("techStackContainer");
		middleArticle.appendChild(techStackContainer);

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

			techStackContainer.appendChild(container);

			container.addEventListener("mouseover", () => {
				this.handleIconsHover(true, iconTitle, iconOverlay);
			})

			container.addEventListener("mouseleave", () => {
				this.handleIconsHover(false, iconTitle, iconOverlay);
			})

			container.addEventListener("blur", () => {
				this.handleIconsHover(false, iconTitle, iconOverlay);
				alert("XX")
			})
		}

		mainSection.appendChild(middleArticle);
	}

	prepareBottomArticle(mainSection) {
		const bottomArticle = document.createElement("section");
		bottomArticle.classList.add("bottomArticle");
		this.content.bottomArticle = bottomArticle;

		const articleSubTitleContainer = document.createElement("div");
		articleSubTitleContainer.classList.add("articleSubTitleContainer", "bottomArticleSubTitleContainer");
		this.content.articleSubTitleContainer = articleSubTitleContainer;

		let bottomArticleTitle = document.createElement("p");
		bottomArticleTitle.textContent = this.text.mainSection.bottomArticle.title;
		bottomArticleTitle.classList.add("bottomArticleTitle");
		articleSubTitleContainer.appendChild(bottomArticleTitle);

		const bottomArticleHr = document.createElement("hr");
		bottomArticleHr.classList.add("bottomArticleHr");
		articleSubTitleContainer.appendChild(bottomArticleHr);

		bottomArticle.appendChild(articleSubTitleContainer);

		let bottomArticleContent = document.createElement("p");
		bottomArticleContent.textContent = this.text.mainSection.bottomArticle.content;
		bottomArticleContent.classList.add("bottomArticleText", "articleTextContainer");
		bottomArticle.appendChild(bottomArticleContent);

		this.content.mainSection.appendChild(bottomArticle);
	}

	handleTitleTextShadow() {
		const title = document.querySelector(".articleTitle");
		let mainOffset = [
			Math.floor(Math.random() * 10 - 5),
			Math.floor(Math.random() * 10 - 5),
		];

		let offset1;
		let offset2;

		if (this.shadowAnimation.counter === 2) {
			offset1 = Math.floor(Math.random() * 4 - 2);
			this.shadowAnimation.counter = 0;
			this.shadowAnimation.frame++;

			if (this.shadowAnimation.frame === this.shadowAnimation.coords.length) {
				offset2 = Math.floor(Math.random() * 4 - 2);
				this.shadowAnimation.frame = 0;
			}
		}

		this.shadowAnimation.counter++;
		title.style.textShadow = `${offset1 + mainOffset[0]}px ${offset2 + mainOffset[1]}px 3px #5B5B5B`;
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
			
				window.onclick = () => {
					// console.log(document.querySelector(".mainSection").scrollHeight, document.querySelector(".middleArticle").offsetTop)
					// alert(window.innerWidth);
				}
			}
		}
	}
}

window.ontouchend = () => {
	// alert(window.innerWidth);
}

window.onclick = () => {
	console.log(document.querySelector(".imageCanvas").offsetTop)
	// alert(window.innerWidth);
}

export default MainSection;
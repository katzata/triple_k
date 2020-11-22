import "./PortfolioSection.css";
import Assets from "../../assets/assets.json";

class PortfolioSection {
	constructor() {
		this.states = {
			prepared: false,
			done: false,
			displaying: false
		}

		this.text;

		this.content = {
			portfolioSection: undefined,
			projectContainers: undefined,
			projectTitleContainer: undefined,
			projectPreviews: undefined,
			projectInfo: undefined,
			links: undefined
		}

		this.info = {
			offset: 1,
			scrolling: [],
			reverse: []
		}
	}

	init() {
		const portfolioSection = document.createElement("section");
		portfolioSection.classList.add("portfolioSection");
		this.content.portfolioSection = portfolioSection;

		this.handleProjects(portfolioSection);

		document.querySelector("main").appendChild(portfolioSection);

		this.content.links = document.querySelectorAll(".link");
		this.content.projectContainers = document.querySelectorAll(".projectContainer");
		this.content.projectTitleContainers = document.querySelectorAll(".projectTitleContainer");
		this.content.projectAnchorContainer = document.querySelectorAll(".projectAnchorContainer");
		this.content.projectPreviews = document.querySelectorAll(".projectPreview");
		this.content.projectInfoInternalContainer = document.querySelectorAll(".projectInfoInternalContainer");
		this.content.projectInfo = document.querySelectorAll(".projectInfoContainer");

		this.handleListeners();
		
		this.states.prepared = true;
		this.states.displaying = true;
		
		setTimeout(() => {
			this.handleFade(true);
		}, 5)
	}

	setLanguage(language) {
		this.text = require(`../../assets/localisation/${language}.json`);
	}

	handleListeners() {
		this.content.portfolioSection.addEventListener("transitionend", () => {
			if (this.content.portfolioSection.style.opacity === "0") {
				this.content.portfolioSection.style.transform = "scale(0)";
				
				this.states.displaying = false;
				this.projectsFadeIn(false);
			} else {
				this.projectsFadeIn(true);
			}
		})

		for (let i = 0; i < this.content.projectContainers.length; i++) {
			this.content.links[i].addEventListener("mouseenter", () => {
				this.handleTitleTransitions(true, i);
			});

			this.content.links[i].addEventListener("mouseleave", () => {
				this.handleTitleTransitions(false, i);
			});
		}

		for (let i = 0; i < this.content.projectPreviews.length; i++) {
			this.content.projectPreviews[i].addEventListener("transitionend", () => {
				if (this.content.projectPreviews[i].style.cssText === "width: 88%; height: 88%;") {
					console.log("x");
					this.info.scrolling[i] = true;
				} else {
					console.log("y");
					this.info.scrolling[i] = false;
				}
			});
		}
	}

	projectsFadeIn(toggle) {
		for (let i = 0; i < this.content.projectContainers.length; i++) {
			setTimeout(() => {
				this.content.projectContainers[i].style.opacity = toggle ? "1" : "0";
			}, (i * 250));
		}
	}

	capitaliseText(text) {
		let result = text.charAt(0).toUpperCase() + text.slice(1, text.length);
		return result;
	}

	handleTitleTransitions(toggle, index) {
		if (toggle) {
			this.content.projectTitleContainers[index].style.transform = "translateY(0%)";
			this.content.projectAnchorContainer[index].style.transform = "translateY(0%)";
			this.content.projectPreviews[index].style.width = "88%";
			this.content.projectPreviews[index].style.height = "88%";
			this.content.projectInfo[index].style.transform = "translateY(0%)";
		} else {
			this.content.projectTitleContainers[index].style.transform = "translateY(-100%)";
			this.content.projectAnchorContainer[index].style.transform = "translateY(-100%)";
			this.content.projectPreviews[index].style.width = "100%";
			this.content.projectPreviews[index].style.height = "100%";
			this.content.projectInfo[index].style.transform = "translateY(calc(100% + 1px))";
		}
	}

	handleInfoScrolling() {
		for (let i = 0; i < this.info.scrolling.length; i++) {
			if (this.info.scrolling[i]) {
				if (this.content.projectInfoInternalContainer[i].scrollWidth > this.content.projectInfoInternalContainer[i].offsetWidth) {
					
					if (!this.info.reverse[i]) {
						if (this.content.projectInfoInternalContainer[i].scrollLeft < this.content.projectInfoInternalContainer[i].scrollWidth) {
							this.content.projectInfoInternalContainer[i].scrollLeft += this.info.offset;
						} else {
							setTimeout(() => {
								this.info.reverse[i] = true;
							}, 1000)
						}
					} else {
						if (this.content.projectInfoInternalContainer[i].scrollLeft > 0) {
							this.content.projectInfoInternalContainer[i].scrollLeft -= this.info.offset;
						} else {
							setTimeout(() => {
								this.info.reverse[i] = false;
							}, 1000)
						}
					}
				}
			} else {
				if (this.content.projectInfoInternalContainer[i].scrollLeft !== 0) {
					this.content.projectInfoInternalContainer[i].scrollLeft = 0;
				}
			}
		}
		// console.log("scroll", this.content.projectInfo[i].scrollWidth, "width", this.content.projectInfo[i].offsetWidth)
		// console.log("scroll", document.querySelectorAll(".projectInfo")[i].scrollWidth,  "width", document.querySelectorAll(".projectInfo")[i].offsetWidth);
	}

	handleProjects(parent) {
		const projects = Object.values(Assets.projects);
		const titles = Object.keys(Assets.projects)

		for (let i = 0; i < projects.length; i++) {
			const projectContainer = document.createElement("div");
			projectContainer.classList.add("projectContainer");

			const projectTitleContainer = document.createElement("div");
			projectTitleContainer.classList.add("projectTitleContainer");
			projectContainer.appendChild(projectTitleContainer);

			const projectTitle = document.createElement("h5");
			projectTitle.classList.add("projectTitle");
			projectTitle.textContent = this.capitaliseText(titles[i])
			projectTitleContainer.appendChild(projectTitle);

			const projectAnchorContainer = document.createElement("div");
			projectAnchorContainer.classList.add("projectAnchorContainer");
			projectContainer.appendChild(projectAnchorContainer);

			const projectAnchor = document.createElement("a");
			projectAnchor.classList.add("projectAnchor");
			projectAnchor.href = projects[i][1];
			projectAnchor.textContent = "visit"; //////////////////////////////////
			projectAnchorContainer.appendChild(projectAnchor);

			const projectInfoContainer = document.createElement("div");
			projectInfoContainer.classList.add("projectInfoContainer");
			projectContainer.appendChild(projectInfoContainer);

			const projectInfoInternalContainer = document.createElement("div");
			projectInfoInternalContainer.classList.add("projectInfoInternalContainer");
			projectInfoContainer.appendChild(projectInfoInternalContainer);

			const projectInfo = document.createElement("p");
			projectInfo.classList.add("projectInfo");
			projectInfo.textContent = projects[i][2];
			projectInfoInternalContainer.appendChild(projectInfo);

			this.info.scrolling.push(false);
			this.info.reverse.push(false);

			const projectInfoBlur = document.createElement("div");
			projectInfoBlur.classList.add("projectInfoBlur");
			projectInfoContainer.appendChild(projectInfoBlur);

			const projectPreview = document.createElement("img");
			projectPreview.classList.add("projectPreview");
			projectPreview.src = projects[i][0];
			projectContainer.appendChild(projectPreview);
			
			const link = document.createElement("a");
			link.classList.add("link");
			// link.href = projects[i][1];
			// link.href = "#";
			
			projectContainer.appendChild(link);
			parent.appendChild(projectContainer);
		}
	}

	handleFade(state) {
		if (state) {
			this.content.portfolioSection.style.transform = "scale(1)";
			this.content.portfolioSection.style.opacity = "1";
		} else {
			this.content.portfolioSection.style.opacity = "0";
		}
	}

	render(language) {
		if (!this.states.prepared) {
			this.setLanguage(language);
			this.init();
		} else {
			if (!this.states.displaying) {
				this.states.displaying = true;
				this.handleFade(true);
			}
		}
	}
}

export default PortfolioSection;
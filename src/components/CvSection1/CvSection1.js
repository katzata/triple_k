import "./CvSection1.css";
import Assets from "../../assets/assets.json";

class CvSection1 {
	constructor() {
		this.states = {
			prepared: false,
			done: false,
			displaying: false
		}

		this.text;

		this.content = {
			cvSection1: undefined,
			cvContainer: undefined,
			pdf: undefined
		}
	}

	init() {
		const cvSection1 = document.createElement("section");
		cvSection1.classList.add("cvSection1");
		this.content.cvSection1 = cvSection1;

		this.handlePdf(cvSection1);
		this.handleListeners();

		this.states.prepared = true;
		this.states.displaying = true;
		
		document.querySelector("main").appendChild(cvSection1);

		setTimeout(() => {
			this.handleFade(true);
		}, 5)
	}

	setLanguage(language) {
		this.text = require(`../../assets/localisation/${language}.json`);
	}

	handleListeners() {
		this.content.cvSection1.addEventListener("transitionend", () => {
			if (this.content.cvSection1.style.opacity === "0") {
				this.content.cvSection1.style.transform = "scale(0)";
				this.content.cvContainer.style.display = "none";
				this.states.displaying = false;
			}
		})
	}

	handlePdf(parent) {
		const cvContainer = document.createElement("div");
		cvContainer.classList.add("cvContainer");
		parent.appendChild(cvContainer);
		this.content.cvContainer = cvContainer;

		const pdf = document.createElement("iframe");
		pdf.classList.add("cv");
		pdf.src = Assets.cv;
		pdf.type = "application/pdf";
		cvContainer.appendChild(pdf);
		this.content.pdf = pdf;
	}

	handleFade(state) {
		if (state) {
			this.content.cvSection1.style.transform = "scale(1)";
			this.content.cvSection1.style.opacity = "1";
			this.content.cvContainer.style.display = "flex";
		} else {
			this.content.cvSection1.style.opacity = "0";
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

export default CvSection1;
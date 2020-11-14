import "./CvSection2.css";

class CvSection2 {
	constructor() {
		this.states = {
			prepared: false,
			displaying: false
		}

		this.text;

		this.content = {
			iframeContainer: undefined,
			iframe: undefined
		}
	}

	init() {
		this.handleIframe();
		this.content.iframeContainer = document.querySelector(".iframeContainer");
		this.content.iframe = document.querySelector(".iframe");
		this.handleListeners();

		this.states.prepared = true;
		this.handleFade(true);
	}

	setLanguage(language) {
		this.text = require(`../PageContent/${language}.json`);
	}

	handleListeners() {
		this.content.iframeContainer.addEventListener("transitionend", () => {
			if (this.content.iframeContainer.style.opacity === "0") {
				this.content.iframeContainer.style.transform = "scaleY(0)";
				this.states.displaying = false;
				this.content.iframe.src = "http://192.168.1.4:9000/DoomCV/cv.html";
			}
		})
	}

	handleIframe() {
		const doomContainer = document.createElement("section");
		doomContainer.classList.add("iframeContainer");
		
		const doom = document.createElement("iframe");
		doom.src = "http://192.168.1.4:9000/DoomCV/cv.html";
		doom.classList.add("iframe");
		doom.style.width = `${window.innerWidth}px`;
		doom.style.height = `${window.innerWidth * (490 / 800)}px`;
		this.content.iframe = doom;
		doomContainer.appendChild(doom);
		
		document.querySelector("main").appendChild(doomContainer);
	}

	handleFade(state) {
		if (state) {
			this.content.iframeContainer.style.transform = "scaleY(1)";
			this.content.iframeContainer.style.opacity = "1";
		} else {
			this.content.iframeContainer.style.opacity = "0";
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

export default CvSection2;
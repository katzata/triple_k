import "./CertificatesSection.css";
import Assets from "../../assets/assets.json";

class CertificatesSection {
	constructor() {
		this.states = {
			prepared: false,
			displaying: false
		}

		this.text = "";

		this.content = {
			certificatesSection: undefined,
			thumbnailSection: undefined,
			thumbnails: undefined,
			covers: [],
			pdfs: undefined,
		};

		this.toggle = {
			pdfVisible: false,
			exitPdfButton: false
		}
	}

	init() {
		const certificatesSection = document.createElement("section");
		certificatesSection.classList.add("certificatesSection");
		this.content.certificatesSection = certificatesSection;

		const thumbnailSection = document.createElement("div");
		thumbnailSection.classList.add("thumbnailSection");
		certificatesSection.appendChild(thumbnailSection);
		this.content.thumbnailSection = thumbnailSection;

		for (let i = 0; i < Assets.certificates.pdfs.length; i++) {
			this.handleThumbNails(thumbnailSection, i);
			this.handlePdfs(certificatesSection, i);
		}

		document.querySelector("main").appendChild(certificatesSection);

		this.handleListeners();

		this.states.prepared = true;
		this.states.displaying = true;
		
		setTimeout(() => {
			this.handleFade(true);
		}, 5)
	}

	handleListeners() {
		this.content.certificatesSection.addEventListener("transitionend", () => {
			if (this.content.certificatesSection.style.opacity === "0") {
				this.content.certificatesSection.style.transform = "scaleY(0)";
				this.content.certificatesSection.style.zIndex = "-2";
				this.states.displaying = false;
				this.togglePdfs();
			}
		})
	}

	setLanguage(language) {
		this.text = require(`../../assets/localisation/${language}.json`);
	}

	handleThumbNails(thumbnailSection, index) {
		const certificateContainer = document.createElement("div");
		certificateContainer.classList.add("certificateContainer");

		const thumbnailContainer = document.createElement("div");
		thumbnailContainer.classList.add("thumbnailContainer");
		certificateContainer.appendChild(thumbnailContainer);

		const thumbnailInnerContainer = document.createElement("div");
		thumbnailInnerContainer.classList.add("thumbnailInnerContainer");
		thumbnailContainer.appendChild(thumbnailInnerContainer);

		const thumbnail = document.createElement("img");
		thumbnail.src = Assets.certificates.thumbnails[index];
		thumbnail.classList.add("thumbnail");
		thumbnailInnerContainer.appendChild(thumbnail);

		const thumbnailTitle = document.createElement("p");
		thumbnailTitle.textContent = `${this.text.certificatesSection.titles[index]}`;
		thumbnailTitle.classList.add("thumbnailTitle", `thumbnailTitle${index + 1}`);
		thumbnailContainer.appendChild(thumbnailTitle);

		const thumbnailCover = document.createElement("div");
		thumbnailCover.classList.add("thumbnailCover", `thumbnailCover${index}`);
		thumbnailInnerContainer.appendChild(thumbnailCover);
		this.content.covers.push(thumbnailCover);

		thumbnailSection.appendChild(certificateContainer);

		thumbnailContainer.addEventListener("mouseenter", () => {
			thumbnailContainer.style.boxShadow = "0 0 13px 12px rgba(0, 0, 0, .85)";
			thumbnailContainer.style.transform = "scale(1, 1)";
			thumbnailCover.style.backgroundColor = "rgba(0, 0, 0, .0)";
		});

		thumbnailContainer.addEventListener("mouseleave", () => {
			thumbnailContainer.style.boxShadow = "0 0 10px 9px rgba(0, 0, 0, .8)";
			thumbnailContainer.style.transform = "scale(.99, .99)";
			thumbnailCover.style.backgroundColor = "rgba(0, 0, 0, .1)";
		});
	}

	handlePdfs(parent, index) {
		const pdfContainer = document.createElement("div");
		pdfContainer.classList.add("pdfContainer");
		parent.appendChild(pdfContainer);

		const pdf = document.createElement("iframe");
		pdf.classList.add("pdf");
		pdf.src = Assets.certificates.pdfs[index];
		pdf.type = "application/pdf";
		pdfContainer.appendChild(pdf);

		if (window.navigator === "iPhone") {
			pdf.width = `${window.innerWidth}px`;
		}

		const exitPdfButton = document.createElement("button");
		exitPdfButton.classList.add("exitPdfButton");
		exitPdfButton.textContent = `${this.text.shared.exitPdf}`;
		pdfContainer.appendChild(exitPdfButton);


		this.content.covers[index].addEventListener("click", () => {
			pdf.style.opacity = "1";
			this.togglePdf(pdfContainer);
		});

		pdfContainer.addEventListener("mouseenter", () => {
			this.togglePdfExitButton(exitPdfButton);
		});

		pdfContainer.addEventListener("mouseleave", () => {
			this.togglePdfExitButton(exitPdfButton);
		});

		exitPdfButton.addEventListener("click", () => {
			this.togglePdf(pdfContainer);
		});
	}

	togglePdfs() {
		const pdfs = document.querySelectorAll(".pdfContainer");
		const display = this.states.displaying ? "flex" : "none";

		for (let i = 0; i < pdfs.length; i++) {
			pdfs[i].style.display = display;
		}
	}

	handleSizes() {
		// this.content.certificatesSection.style.width = `${window.innerWidth + 17}px`;
	}

	toggleOpacity() {
		if (this.page.opacity === "0") {
			this.page.opacity = "1";
			document.querySelector(".certificatesSection").style.opacity = `${this.page.opacity}`;
		} else {
			this.page.opacity = "0";
			document.querySelector(".certificatesSection").style.opacity = `${this.page.opacity}`;
		}
	}

	togglePdf(pdf) {
		if (!this.toggle.pdfVisible) {
			pdf.style.transform = "translateY(0%)";
			this.toggle.pdfVisible = true;
		} else {
			pdf.style.transform = "translateY(-100%)";
			this.toggle.pdfVisible = false;
		}
	}

	togglePdfExitButton(button) {
		if (!this.toggle.exitPdfButton) {
			button.style.transform = "translateX(0px)";
			this.toggle.exitPdfButton = true;
		} else {
			button.style.transform = "translateX(-70px)";
			this.toggle.exitPdfButton = false;
		}
	}

	handleFade(state) {
		if (state) {
			this.content.certificatesSection.style.transform = "scaleY(1)";
			this.content.certificatesSection.style.opacity = "1";
			this.content.certificatesSection.style.zIndex = "0";

			this.togglePdfs();
		} else {
			this.content.certificatesSection.style.opacity = "0";
		}
	}

	render(language) {
		if (!this.states.prepared) {
			this.setLanguage(language);
			this.init();

			window.onclick = () => {
				// this.toggleOpacity();
				// alert(window.navigator.platform)
				// console.log("x")
			}
		} else {
			if (!this.states.displaying) {
				this.states.displaying = true;
				this.handleFade(true);
			}
			this.handleSizes();
		}
	}
}



export default CertificatesSection;
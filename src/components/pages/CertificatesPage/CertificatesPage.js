import BaseComponent from "../../core/BaseComponent/BaseComponent";
import certificatesPageTemplate from "./certificatesPage.hbs";
import "./certificatesPage.scss";

import { certificates } from "../../../assets/assets";
import { coreComponents } from "../../../utils/utils";

import BurntPage from "./BurntPage/BurntPage";

class CertificatesPage extends BaseComponent {
    constructor() {
        super();
        
        this.component = document.createElement("section");
        this.id = "certificatesPage";
        this.template = certificatesPageTemplate;
        this.burntPages = [];
        this.templateData = () => {
            const { title, sections, zoomButton, downloadButton } = this.currentLang.certificatesSection;

            for (const [section, content] of Object.entries(certificates)) {
                sections[section].content = content;
                
                const toggles = [...Array(content.length).fill(false)];
                this.svgHoverToggles.push(...toggles);
            };

            return { pageTitle: title, sections, zoomButton, downloadButton};
        };

        this.svgHoverToggles = [];
        this.burntPages = [];
        this.pagesAppended = false;
        this.disolveCertificate = false;

        this.eventHandlers = [
            { targetClass: ".certificateSlot", event: "onmouseenter", handler: this.slotOnHover },
            { targetClass: ".certificateSlot", event: "onmouseleave", handler: this.slotOnHover },
            { targetClass: ".zoomButton", event: "onclick", handler: this.onClickZoomButton },
        ];

        this.animationsLoop([
            this.handleRowsBg,
            // this.handleBurntPages,
            // this.handleCertificateMask,
            this.handleCertificates
        ]);
    };

    slotOnHover = (e) => {
        const { type } = e;
        const { index } = e.target.dataset;

        if (type === "mouseenter") {
            this.svgHoverToggles[index] = true;
        } else {
            this.svgHoverToggles[index] = false;
        };
    };

    handleRowsBg = () => {
        const { running, alpha } = coreComponents.mainCanvas.humanShapeAnimation;
        if (running) {
            const rows = this.component.querySelectorAll(".rowWrapper");
            const count = rows.length;

            for (let i = 0; i < count; i++) {
                rows[i].style.backgroundImage = `linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0),
                    rgba(23, 23, 23, ${1 - alpha}),
                    rgba(0, 0, 0, 0)
                )`;
            }
        }
    };

    handleCertificates = () => {
        const count = this.svgHoverToggles.length;
        const certificateContainers = this.component.querySelectorAll(".certificateContainer");

        for (let i = 0; i < count; i++) {
            if (!certificateContainers[i].className.includes("fixed")) {
                if (this.svgHoverToggles[i]) {
                    if (certificateContainers[i].style.transform !== "scale(1.1, 1.1)") {
                        certificateContainers[i].style.transform = "scale(1.1, 1.1)";
                        const [thumbB, thumbF] = certificateContainers[i].children;

                        thumbB.style.animationName = "certificatesFlip";
                        thumbF.style.animationName = "certificatesFlip";
                    };
                } else {
                    if (certificateContainers[i].style.transform !== "scale(1, 1)") {
                        certificateContainers[i].style.transform = "scale(1, 1)";
                        const [thumbB, thumbF] = certificateContainers[i].children;

                        thumbB.style.animationName = "";
                        thumbF.style.animationName = "";
                    };
                };
            } else {
                if (certificateContainers[i].style.transform !== "scale(1, 1)") {
                    certificateContainers[i].style.transform = "scale(1, 1)";
                    const [thumbB, thumbF] = certificateContainers[i].children;

                    thumbB.style.animationName = "";
                    thumbF.style.animationName = "";
                };
            };
        }
    };

    handleBurntPages = () => {
        for (let i = 0; i < this.svgHoverToggles.length; i++) {
            const container = this.component.querySelectorAll(".certificateContainer");

            if (this.svgHoverToggles[i] && !container[i].className.includes("fixed")) {
                const containerF = this.component.querySelectorAll(".thumb_f_container")[i];
                const containerB = this.component.querySelectorAll(".thumb_b_container")[i];

                if (!this.pagesAppended && coreComponents.mainCanvas.humanShapeAnimation.running) {
                    const pageF = new BurntPage({ title: containerF.dataset.title, index: i });
                    const pageB = new BurntPage({ title: containerB.dataset.title, index: i });
                    
                    this.burntPages.push(pageF);
                    this.burntPages.push(pageB);

                    containerF.appendChild(pageF.render());
                    containerB.appendChild(pageB.render());
                    
                    pageF.isVisible = true;
                    pageB.isVisible = true;

                    this.pagesAppended = true;
                } else {
                    if (this.burntPages.length > 0) {
                        if (!this.burntPages[0].isVisible && this.burntPages[0].frameIndex === 1
                            && !this.burntPages[1].isVisible && this.burntPages[1].frameIndex === 1) {
                            this.burntPages[0].remove();
                            this.burntPages[1].remove();
                            this.pagesAppended = false;
                            this.burntPages = [];
                        };
                    };
                };
            } else {
                if (container[i].className.includes("fixed") && this.burntPages.length > 0) {
                    this.burntPages[0].remove();
                    this.burntPages[1].remove();
                    this.pagesAppended = false;
                    this.burntPages = [];
                };
            };
        };
    };

    handleCertificateMask = () => {
        if (this.burntPages.length > 0) {
            console.log("x", this.burntPages[0].frameIndex);
            for (let i = 0; i < this.burntPages.length; i++) {
                const { index } = this.burntPages[i];
                
                const thumbContainers = Array.from(this.component.querySelectorAll(".certificateContainer")[index].children);
                const mask1 = thumbContainers[0].children[0].children[0].children[0];
                const mask2 = thumbContainers[1].children[0].children[0].children[0];
                
                mask1.setAttribute("href", `../../../../assets/gfx/img/disolve_animation_inverted/burning_paper${this.burntPages[i].frameIndex}.png`);
                mask2.setAttribute("href", `../../../../assets/gfx/img/disolve_animation_inverted/burning_paper${this.burntPages[i].frameIndex}.png`);
            };
        };
    };
 
    onClickZoomButton = (e, index) => {
        const certificateContainer = this.component.querySelectorAll(".certificateContainer")[index];
        const buttonsContainer = this.generateBigCertificateButtons(certificateContainer, index);

        certificateContainer.appendChild(buttonsContainer);
        certificateContainer.classList.add("fixed");
        certificateContainer.nextElementSibling.style.display = "none";
    };

    generateBigCertificateButtons(certificateContainer, index) {
        const handleToggles = () => this.svgHoverToggles[index] = false;

        const closeButton = this.createElement(
            "button", 
            {
                id: "closeButton",
                className: "bigCertificateButtons",
                onclick: function() {
                    certificateContainer.nextElementSibling.style.display = "block";
                    certificateContainer.classList.remove("fixed");
                    
                    this.parentElement.remove();

                    Array.from(certificateContainer.children).forEach(el => el.style.animationName = "");
                    handleToggles();
                }
            },
            [this.createElement("img", { src: "../../../assets/gfx/icons/shared/close.svg" })]
        );
        
        const { title } = certificateContainer.children[0].dataset;
        const downloadPdf = this.createElement(
            "a",
            {
                id: "downloadPdf",
                className: "bigCertificateButtons",
                href: `./assets/certificates/pdfs/${title}.pdf`,
                download: `${title}.pdf`
            },
            [this.createElement("img", { src: "../../../assets/gfx/icons/shared/pdf.svg" })]
        );

        const buttonsContainer = this.createElement("div", { id: "bigCertificateButtonsContainer"})
        buttonsContainer.replaceChildren(closeButton, downloadPdf);
        return buttonsContainer;
    };
};

export default CertificatesPage;
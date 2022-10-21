import BaseComponent from "../../core/BaseComponent/BaseComponent";
import certificatesPageTemplate from "./certificatesPage.hbs";
import "./certificatesPage.scss";

import { certificates } from "../../../assets/assets";
import { coreComponents } from "../../../utils/utils";

import BurntPage from "./BurntPage/BurntPage";

/**
 * CertificatesPage creates a new HTMLElement (section).
 * @class
 * @extends BaseComponent
 */
class CertificatesPage extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     * @see BaseComponent.templateData
     * 
     * @param {Array} svgHoverToggles An array containing booleans that trigger the hovering effect.
     * @param {Array} burntPages To be changed on account that the animation performance degrades if left to run for about 10 minutes.
     * The degraded performance do not recover until the page has been reloaded.
     * 
     * @param {Array} burntPages Not active at the moment and will probably be removed.
     * @param {Array} disolveCertificate Not active at the moment.
     * 
     * @see BaseComponent.eventHandlers
     * @see BaseComponent.animationsLoop
     */
    constructor() {
        super();
        
        this.component = document.createElement("section");
        this.id = "certificatesPage";
        this.template = certificatesPageTemplate;
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
            { targetClass: ".zoomButton", event: "onclick", handler: this.onZoomButtonClick },
        ];

        this.animationsLoop([
            this.handleRowsBg,
            // this.handleBurntPages,
            // this.handleCertificateMask,
            this.handleCertificates
        ]);
    };

    /**
     * Method handling the hover animation of the specific certificate slot.
     * It toggles the appropriate hover toggle (this.svgHoverToggles).
     * @param {Event} e The currently fired event. Used to determine the event type and to extract the index from the current HTMLElement dataset attribute.
     * Arrow function to keep the scope here.
     */
    slotOnHover = (e) => {
        const { type } = e;
        const { index } = e.target.dataset;

        if (type === "mouseenter") {
            this.svgHoverToggles[index] = true;
        } else {
            this.svgHoverToggles[index] = false;
        };
    };

    /**
     * Method handling the "certificateRow" background opacity during the human shape animation.
     * Arrow function to keep the scope here.
     */
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
            };
        };
    };

    /**
     * Method handling the certificate animation when hovered upon.
     * Arrow function to keep the scope here.
     */
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

    /**
     * !!!
     * Disabled at the moment.
     * Will probbaly be completly changed.
     * !!!
     * Method handling the burnt pages that will appear over the certificates.
     * Arrow function to keep the scope here.
     */
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

    /**
     * !!!
     * Disabled at the moment.
     * Will probbaly be completly changed.
     * !!!
     * Method handling the certificate mask.
     * Arrow function to keep the scope here.
     */
    handleCertificateMask = () => {
        if (this.burntPages.length > 0) {
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
 
    /**
     * Method handling the transition from a small to big certificates.
     * The transition is done by adding a new css class (fixed) to the certificateContainer element.
     * @param {Event} _ Not intended to be used in any way, hence the "_".
     * @param {Number} index A number indicating which zoom button was clicked so that the appropriate certificate will be enlarged.
     */
    onZoomButtonClick = (_, index) => {
        const certificateContainer = this.component.querySelectorAll(".certificateContainer")[index];
        const buttonsContainer = this.generateBigCertificateButtons(certificateContainer, index);

        certificateContainer.appendChild(buttonsContainer);
        certificateContainer.classList.add("fixed");
        certificateContainer.nextElementSibling.style.display = "none";
    };

    /**
     * Method generating the needed buttons for the enlarged certificate (close button and download pdf button).
     * Also adds the needed event listeners for them.
     * @param {HTMLElement} certificateContainer The parent container to be manipulated (add/remove "fixed" css class).
     * @param {Number} index The index indicating which parent container should be manipulated.
     * @returns {HTMLElement} The button container and buttons appended.
     */
    generateBigCertificateButtons(certificateContainer, index) {
        const handleClick = (parentElement) => this.onCloseButtonClick(certificateContainer, index,parentElement);
        const closeButton = this.createElement(
            "button", 
            {
                id: "closeButton",
                className: "bigCertificateButtons",
                onclick: function() {
                    handleClick(this.parentElement)
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

    /**
     * Method handling the the certificateContainer and removing some of its schildren when closed.
     * @param {HTMLDivElement} certificateContainer The certificate container that is to receive the class ".fixed";
     * @param {Number} index The index of the current certificateContainer that is being manipulated.
     * @param {HTMLDivElement} buttonContianer A newly created element contianing 2 buttons (close, download pdf) that will be removed.
     */
    onCloseButtonClick = (certificateContainer, index, buttonContianer) => {
        certificateContainer.nextElementSibling.style.display = "block";
        certificateContainer.classList.remove("fixed");
        
        buttonContianer.remove();
        
        Array.from(certificateContainer.children).forEach(el => el.style.animationName = "");
        this.svgHoverToggles[index] = false;
    };
};

export default CertificatesPage;
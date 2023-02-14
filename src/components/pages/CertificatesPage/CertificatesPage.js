import BaseComponent from "../../core/BaseComponent/BaseComponent";
import certificatesPageTemplate from "./certificatesPage.hbs";
import "./certificatesPage.scss";

import { certificates } from "../../../assets/assets";
import { coreComponents } from "../../../utils/utils";

import BurntPageSvg from "./BurntPage/BurntPageSvg";

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
     * 
     * @param {Array} burntPages Not active at the moment and will probably be removed.
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

            this.generateCertificates(sections);
            return { pageTitle: title, sections, zoomButton, downloadButton};
        };

        this.svgHoverToggles = [];
        this.burntPages = [];
        this.burntPageDisolving = false;

        this.childSubComponents = [];
        
        this.eventHandlers = [
            { targetClass: ".certificateSlot", event: "ontouchend", handler: this.slotOnHover },
            { targetClass: ".certificateSlot", event: "onblur", handler: this.slotOnHover },
            { targetClass: ".certificateSlot", event: "onmouseenter", handler: this.slotOnHover },
            { targetClass: ".certificateSlot", event: "onmouseleave", handler: this.slotOnHover },
            { targetClass: ".zoomButton", event: "onclick", handler: this.onZoomButtonClick },
            { targetClass: ".zoomButton", event: "ontransitionend", handler: (e) => {
                if (e.animationName === "zoomButtonHide") {
                    e.target.style.display = "none";
                    e.target.style.transitionDuration = "0s";
                };
            }},
            { targetClass: ".certificateContainer", event: "onanimationend", handler: (e) => {
                if (e.animationName === "bigCertificateZoomOut") {
                    e.target.classList.remove("fixed");
                    e.target.children[0].style.display = "block";
                    
                    // Timeout in order to be executed fraction of a second after the "e.target.classList.remove("fixed")"
                    setTimeout(() => {
                        e.target.style.transitionDuration = ".2s";
                    }, 0);
                };
            }}
        ];

        this.animationsLoop([
            this.monitorCertificates
        ]);

        /**
         * Event handler making sure that all toggles are off 
         */
        document.querySelector("body").ontouchend = (e) => {
            if (!e.target.className.includes("certificateSlot")) {
                const certificateContainers = this.component.querySelectorAll(".certificateContainer");
                const count = this.svgHoverToggles.length;
                for (let i = 0; i < count; i++) {
                    if (this.svgHoverToggles[i] !== false) {
                        this.svgHoverToggles[i] = false;
                        this.onCertificateHover(certificateContainers[i], false);
                        this.handleZoomButton(certificateContainers[i].children[0], false);
                    };
                };
            };
        };
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

        if (type === "mouseenter" || type === "touchend") {
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
     * Generate the certificates.
     * @param {Object} sections An object containing the certificate sections and their respective data as key value pairs.
     */
    generateCertificates(sections) {
        const topSections = Object.values(sections);

        for (let i = 0; i < topSections.length; i++) {
            for (let j = 0; j < topSections[i].content.length; j++) {
                this.childSubComponents.push([
                    `.certificateContainer${i}-${j}`,
                    new BurntPageSvg({image: `${topSections[i].content[j]}_b`, title: topSections[i].content[j], index: `${i}-${j}`}).render()
                ])
                this.childSubComponents.push([
                    `.certificateContainer${i}-${j}`,
                    new BurntPageSvg({image: `${topSections[i].content[j]}_f`, title: topSections[i].content[j], index: `${i}-${j}`}).render()
                ])
            };
        };
    };

    /**
     * Method used to monitor the The certificates state.
     * Arrow function to keep the scope here.
     */
    monitorCertificates = () => {
        const count = this.svgHoverToggles.length;
        const certificateContainers = Array.from(this.component.querySelectorAll(".certificateContainer"));

        for (let i = 0; i < count; i++) {
            const container = certificateContainers[i];

            if (!container.className.includes("fixed")) {
                if (this.svgHoverToggles[i]) {
                    this.onCertificateHover(container, this.svgHoverToggles[i]);
                    this.handleZoomButton(container.children[0], this.svgHoverToggles[i]);
                    this.handleBurntPages(container, this.svgHoverToggles[i]);
                } else {
                    this.onCertificateHover(container, false);
                    this.handleZoomButton(container.children[0], false);
                    this.handleBurntPages(container, false);
                };
            } else {
                if (this.svgHoverToggles[i]) {
                    this.svgHoverToggles[i] = false;
                    
                    this.onCertificateHover(container, false);
                    this.handleZoomButton(container.children[0], false);
                    this.handleBurntPages(container, false);
                };
            };
        };
    };

    /**
     * Method handling the certificate animation when hovered upon.
     * @param {HTMLDivElement} certificateContainer The certificates (thumb_b, thumb_f) container.
     * @param {Boolean} hovering The current toggle state.
     */
    onCertificateHover(certificateContainer, hovering) {
        if (hovering) {
            if (certificateContainer.style.transform !== "scale(1.1, 1.1)") {
                const [_, thumbB, thumbF] = certificateContainer.children;
                
                thumbB.style.animationName = "certificatesFlip";
                thumbF.style.animationName = "certificatesFlip";
                
                certificateContainer.style.transform = "scale(1.1, 1.1)";
            };
        } else {
            if (certificateContainer.style.transform !== "scale(1, 1)") {
                const [_, thumbB, thumbF] = certificateContainer.children;
                
                thumbB.style.animationName = "";
                thumbF.style.animationName = "";
                
                certificateContainer.style.transform = "scale(1, 1)";
            };
        };
    };

    /**
     * Method handling the certificates zoom button visibility.
     * !!! The display and transitionDuration properties are being reset in an event handler attached to the zoom button in the constructor.
     * @param {HTMLButtonElement} zoomButton The current certificate zoom button.
     * @param {Boolean} visible The current oom button state.
     */
    handleZoomButton(zoomButton, visible) {
        if (visible) {
            if (zoomButton.style.opacity !== "1") {
                zoomButton.style.display = "block";
                zoomButton.style.transitionDuration = ".2s";
                zoomButton.style.opacity = "1";
            };
        } else {
            if (zoomButton.style.opacity !== "0") {
                zoomButton.style.opacity = "0";
            };
        };
    };

    /**
     * Method handling the fade in and out of the burnt page animation.
     */
    handleBurntPages(container, state) {
        const { alpha, fadeIn } = coreComponents.mainCanvas.humanShapeAnimation;
        const [thumb_b, thumb_f] = container.children;

        if (alpha > 0.1 && state) {
            if (!this.burntPageDisolving) {
                this.burntPageDisolving = true;

                thumb_b.dataset.disolve = "1";
                thumb_f.dataset.disolve = "1";
            };
        } else {
            if (this.burntPageDisolving && thumb_f.dataset.disolve === "0") {
                this.burntPageDisolving = false;
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
        const { parentElement } = certificateContainer.parentElement;
        const buttonsContainer = this.generateBigCertificateButtons(certificateContainer, index);
        const html = document.querySelector("html");
        html.style.position = "fixed";

        certificateContainer.appendChild(buttonsContainer);
        certificateContainer.style.transitionDuration = "0s";
        certificateContainer.classList.add("fixed");
        certificateContainer.style.animationName = "bigCertificateZoomIn";
        certificateContainer.children[0].style.display = "none";
        parentElement.style.overflow = "visible";
        
        this.svgHoverToggles[index] = false;
        this.onCertificateHover(certificateContainer, false);
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
                pointerEvents: "all",
                onclick: function() {
                    handleClick(this.parentElement)
                }
            },
            [this.createElement("img", { src: "../../../assets/gfx/icons/shared/close.svg" })]
        );
        
        const { file } = certificateContainer.parentElement.dataset;
        const downloadPdf = this.createElement(
            "a",
            {
                id: "downloadPdf",
                className: "bigCertificateButtons",
                href: `./assets/certificates/pdfs/${file}.pdf`,
                download: `${file}.pdf`,
                pointerEvents: "all"
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
        const html = document.querySelector("html");
        html.style.position = "static";

        this.svgHoverToggles[index] = false;
        
        certificateContainer.style.animationName = "bigCertificateZoomOut";
        buttonContianer.remove();
        this.handleZoomButton(certificateContainer.children[0], false)
    };
};

export default CertificatesPage;
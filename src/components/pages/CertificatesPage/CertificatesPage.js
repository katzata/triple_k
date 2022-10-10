import BaseComponent from "../../core/BaseComponent/BaseComponent";
import certificatesPageTemplate from "./certificatesPage.hbs";
import "./certificatesPage.scss";

import { certificates } from "../../../assets/assets";

import BurnAnimation from "./BurnAnimation/BurnAnimation";

class CertificatesPage extends BaseComponent {
    constructor() {
        super();
        
        this.component = document.createElement("section");
        this.id = "certificatesPage";
        this.template = certificatesPageTemplate;
        this.templateData = () => {
            const { sections, zoomButton, downloadButton } = this.currentLang.certificatesSection;
            const burnAnimation = new BurnAnimation().render();

            for (const [section, content] of Object.entries(certificates)) {
                sections[section].content = content;

                const toggles = [...Array(content.length).fill(false)];
                this.svgHoverToggles.push(...toggles);
            };
            
            return { sections, zoomButton, burnAnimation, downloadButton};
        };

        this.svgHoverToggles = [];
        this.offsetsX = [];
        this.offsetsY = [];

        this.childSubComponents = [
           [".thumb_b_container", new BurnAnimation().render()],
           [".thumb_f_container", new BurnAnimation().render()]
        ];

        this.eventHandlers = [
            { targetClass: ".certificateSlot", event: "onmouseenter", handler: this.slotOnHover },
            { targetClass: ".certificateSlot", event: "onmouseleave", handler: this.slotOnHover }
        ];

        this.animationsLoop([
            this.flameParticlesAnimation
        ]);
    };

    slotOnHover = (e) => {
        const { type } = e;
        const { index } = e.target.dataset;

        if (type === "mouseenter") {
            this.svgHoverToggles[index] = true;
            // console.log(this.component.querySelectorAll(".certificateSlot svg"));
        } else {
            this.svgHoverToggles[index] = false;
        };
    };

    flameParticlesAnimation = () => {

    };
};

export default CertificatesPage;
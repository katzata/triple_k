import BaseComponent from "../../core/BaseComponent/BaseComponent";
import certificatesPageTemplate from "./certificatesPage.hbs";
import "./certificatesPage.scss";

import { certificates } from "../../../assets/assets";

class CertificatesPage extends BaseComponent {
    constructor() {
        super();
        
        this.component = document.createElement("section");
        this.component.id = "certificatesPage";
        this.template = certificatesPageTemplate;
        this.templateData = () => {
            const { sections, zoomButton, downloadButton } = this.currentLang.certificatesSection;

            for (const [section, content] of Object.entries(certificates)) {
                sections[section].content = content;
            };

            return {sections, zoomButton, downloadButton};
        };

        this.eventHandlers = [
            // { targetId: "#line1", event: "onmouseenter", handler: this.svgOutlinesOnHover },
            // { targetId: "#line1", event: "onmouseleave", handler: this.svgOutlinesOnHover }
            { targetClass: ".certificateSlot", event: "onmouseenter", handler: this.svgOutlinesOnHover },
            { targetClass: ".certificateSlot", event: "onmouseleave", handler: this.svgOutlinesOnHover }
        ];
    };

    svgOutlinesOnHover(e) {
        const { type } = e;
        console.log(type, e);

        if (type === "mouseenter") {
            
        } else {

        };
    };
};

export default CertificatesPage;
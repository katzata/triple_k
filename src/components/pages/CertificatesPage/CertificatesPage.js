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
            const { sections, downloadButton } = this.currentLang.certificatesSection;
            const certificateAssets = Object.entries(certificates).map(([title, content]) => [sections[title], content]);

            return {certificates: Object.fromEntries(certificateAssets), downloadButton};
        };

        this.subComponents = [this.generateContent];
    };

    generateContent = () => {
        const { sections, downloadButton } = this.currentLang.certificatesSection;

        const certificateAssets = Object.entries(certificates).map(([title, content]) => [sections[title], content]);

        const subSections = certificateAssets.map(([title, content]) => {
            const sectionTitle = this.createElement("h3", { textContent: title });

            const certificateThumbs = content.map(thumb => {
                const thumbs = [`${thumb}_b`, `${thumb}_f`].map(el => {
                    return this.createElement("img", {
                        className: `thumb${el.slice(el.length - 2)}`,
                        src: `../../../assets/certificates/img/${el}.png`
                    });
                });

                return this.createElement("div", {className: "certificateContainer"}, thumbs)
            });

            const row = this.createElement("div", { className: "certificatesRow" }, certificateThumbs)
            return this.createElement("div", {className: "rowWrapper"}, [sectionTitle, row]);
        });
        
        const certificatesSection = this.createElement("div", {className: "certificatesSection"}, subSections)
        return certificatesSection;
    };

    generateQuickInfo() {

    };
};

export default CertificatesPage;
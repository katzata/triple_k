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
    };
    
    render() {
        
        return super.render();
    };
};

export default CertificatesPage;
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
    };
};

export default CertificatesPage;
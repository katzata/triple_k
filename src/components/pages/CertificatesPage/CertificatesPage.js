import BaseComponent from "../../core/BaseComponent/BaseComponent";
import certificatesPageTemplate from "./certificatesPage.hbs";
import "./certificatesPage.scss";

import { certificates } from "../../../assets/assets";

class CertificatesPage extends BaseComponent {
    constructor() {
        super();
        const { Markup, JavaScript, Other } = certificates;
        this.component = document.createElement("section");
        this.component.id = "certificatesPage";
        this.template = certificatesPageTemplate({ certificates });
    };
};

export default CertificatesPage;
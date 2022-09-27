import BaseComponent from "../BaseComponent/BaseComponent";
import footerTemplate from "./footer.hbs";
import "./footer.scss";

import linkedInIcon from "./icons/linkedIn.hbs";
import telegramIcon from "./icons/telegram.hbs";
import viberIcon from "./icons/viber.hbs";

class Footer extends BaseComponent {
    constructor() {
        super();

        this.component = document.createElement("footer");
        this.template = footerTemplate;
        this.templateData = () => {
            const { main } = this.currentLang.footer;
            return this.template({ main })
        };
    };
};

export default Footer;
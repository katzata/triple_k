import BaseComponent from "../BaseComponent/BaseComponent";
import footerTemplate from "./footer.hbs";
import "./footer.scss";

import linkedInIcon from "./icons/linkedIn.hbs";
import telegramIcon from "./icons/telegram.hbs";
import viberIcon from "./icons/viber.hbs";

/**
 * Footer creates a new HTMLFooter element.
 * @class
 * @extends BaseComponent
 */
class Footer extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     * @see BaseComponent.templateData
     */
    constructor() {
        super();

        this.component = document.createElement("footer");
        this.id = "footer";
        this.template = footerTemplate;

        /**
         * @returns {Object} Section texts in different languages.
         * @see BaseComponent.templateData
         */
        this.templateData = () => {
            const { main } = this.currentLang.footer;
            return { main };
        };
    };
};

export default Footer;
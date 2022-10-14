import BaseComponent from "../../BaseComponent/BaseComponent";
import languageBarTemplate from "./languageBar.hbs";
import "./languageBar.scss";

import { changeLanguage } from "../../../../localisation/langs";

class LanguageBar extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("section", {zIndex: "3"});
        this.id = "languageBar";
        this.template = languageBarTemplate;
        this.templateData = () => ({ langs: this.langs });
        this.isVisible = false;

        this.eventHandlers = [
            { targetId: "#langsToggle", event: "onclick", handler: this.toggleLanguageBar },
            { targetClass: ".langButton", event: "onclick", handler: changeLanguage },
        ];
    };

    toggleLanguageBar = (_, toggle = null) => {
        let width = 20;

        if (toggle !== null) {
            this.isVisible = toggle;
        } else {
            this.isVisible = !this.isVisible;
        };

        if (this.isVisible) {
            const size = document.querySelector("header").offsetHeight;
            const scale = .17;
            const scaled = size + size * scale;
            const buttonSize = (93 / 300) * (size) + 10;
            const calc = Math.ceil(scaled * 3 + buttonSize);

            width = calc;
        };
        
        this.component.style.width = `${width}px`;
        this.arrowHandler();
    };
    
    arrowHandler = () => {
        const arrow = this.component.querySelector("#toggleArrow");

        if (this.isVisible) {    
            arrow.points[0].x = 13;
            arrow.points[1].x = 80;
            arrow.points[2].x = 13;
        } else {
            arrow.points[0].x = 80;
            arrow.points[1].x = 13;
            arrow.points[2].x = 80;
        };
    };
};

export default LanguageBar;
import BaseComponent from "../../BaseComponent/BaseComponent";
import languageBarTemplate from "./languageBar.hbs";
import "./languageBar.scss";

import langs, { changeLanguage } from "../../../../localization/langs";
import { routing, route } from "../../../../router/router";
/**
 * LanguageBar creates a new HTMLElement (section).
 * @extends BaseComponent
 */
class LanguageBar extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     * @see BaseComponent.templateData
     * @param {Boolean} isOpen A trigger that toggles the language bar buttons visibiliti.
     * @see BaseComponent.eventHandlers
     */
    constructor() {
        super();

        this.component = this.createElement("section", {zIndex: "3"});
        this.id = "languageBar";
        this.template = languageBarTemplate;
        this.templateData = () => ({ langs });
        this.isOpen = false;

        this.eventHandlers = [
            { targetId: "#langsToggle", event: "onclick", handler: this.toggleLanguageBar },
            { targetClass: ".langButton", event: "onclick", handler: (e) => !routing && changeLanguage(e, route) },
        ];
    };

    /**
     * Method handling the state and style properties of the language bar and language buttons.
     * Also runs the arrow hadler method.
     * Arrow function to keep the scope here.
     * @param {Event} _ Not intended to be used.
     * @param {Boolean} toggle Sets the language bar state (this.isOpen).
     */
    toggleLanguageBar = (_, toggle = null) => {
        let width = 20;

        if (toggle !== null) {
            this.isOpen = toggle;
        } else {
            this.isOpen = !this.isOpen;
        };

        if (this.isOpen) {
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
    
    /**
     * Method handling the svg polyline points when the arrow is clicked.
     * Arrow function to keep the scope here.
     */
    arrowHandler = () => {
        const arrow = this.component.querySelector("#toggleArrow");

        if (this.isOpen) {    
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
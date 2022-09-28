import BaseComponent from "../../BaseComponent/BaseComponent";
import arrowTemplate from "./arrow.hbs";
import "./languageBar.scss";

import { changeLanguage } from "../../../../localisation/langs";

class LanguageBar extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("section", {zIndex: "3"});
        this.isVisible = false;
        this.events = [];
        this.subComponents = [
            () => this.generateToggleButton(),
            () => this.generateLangButtons()
        ];
        this.component.onblur = () => console.log("x");
    };

    generateToggleButton = () => {
        const arrow = arrowTemplate();
        const button = this.createElement("button", { id: "langsToggle", innerHTML: arrow });

        this.events.push({ item: button, event: "onclick", handler: this.toggleLanguageBar});
        button.onclick = this.toggleLanguageBar;
        // button.onblur = () => this.toggleLanguageBar(false);

        return button;
    };

    generateLangButtons = () => {
        const languages =  Object.keys(this.langs).map(key => {
            const imgAttr = {
                className: "langIcon",
                src: `../../../assets/gfx/icons/langs/${key}.svg`,
                alt: `${key} icon`
            };

            const img = this.createElement("img", imgAttr);
            const span = this.createElement("span", { className: "langTitle", textContent: key.toLocaleUpperCase() });
            const button = this.createElement("button", { className: "langButton" }, [img, span]);

            button.onclick = () => {
                const isChanging = changeLanguage(key);
                if (isChanging) this.toggleLanguageBar(false);
            };
            return button;
        });

        return this.createElement("div", { id: "langsContainer" }, languages);
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
        const arrow = document.querySelector("#toggleArrow");

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
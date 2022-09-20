import BaseComponent from "../../BaseComponent/BaseComponent";
import arrowTemplate from "./arrow.hbs";
import "./languageBar.scss";

import { changeLanguage } from "../../../../localisation/langs";

class LanguageBar extends BaseComponent {
    constructor() {
        super();
        this.component = this.createElement("div", {zIndex: "3"});
        this.component.className = "languageBar";
        this.isVisible = false;
        
        this.component.appendChild(this.generateToggleButton());
        this.component.appendChild(this.generateLangButtons());
    };

    generateToggleButton() {
        const arrow = arrowTemplate();
        const button = this.createElement("button", { id: "langsToggle", innerHTML: arrow });
        
        button.addEventListener("click", () => this.toggleLanguageBar());
        return button;
    };

    generateLangButtons() {
        const languages =  Object.keys(this.langs).map(key => {
            const imgAttr = {
                className: "langIcon",
                src: `../../../assets/gfx/icons/langs/${key}.svg`,
                alt: `${key} icon`
            };
            const img = this.createElement("img", imgAttr);
            const span = this.createElement("span", { className: "langTitle", textContent: key.toLocaleUpperCase() });
            const button = this.createElement("button", { className: "langButton" }, [img, span]);
            
            button.addEventListener("click", () => changeLanguage(key));
            return button;
        });

        return this.createElement("div", { id: "langsContainer" }, languages);
    };

    toggleLanguageBar() {
        let width = 20;
        this.isVisible = !this.isVisible;

        if (this.isVisible) {
            const size = document.querySelector("header").offsetHeight;
            const scale = .17;
            const scaled = size + size * scale;
            const buttonSize = (93 / 300) * (size) + 10;
            const calc = Math.ceil(scaled * 3 + buttonSize);

            width = calc;
        };
        
        this.component.style.width = `${width}px`;
        this.component.style.transitionDelay = `${this.isVisible ? "0s" : ".5s"}`;

        this.component.onTransitionEnd = () => {
            console.log("x");
        }

        this.arrowHandler();
        this.langButtonAnimationHandler();
    };
    
    arrowHandler() {
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

    langButtonAnimationHandler() {
        const langsContainer = document.querySelector("#langsContainer");
        langsContainer.style.animationName = `${this.isVisible ? "fadeIn" : "fadeOut"}`;
        langsContainer.style.animationDelay = `${this.isVisible ? ".3s" : "0s"}`;
    };

    // for testing !!!!!!!!!!!!!!!!!
    render() {
        // console.log(this.template);
        // console.log(this.component.querySelectorAll(".langsToggle"));
        return super.render();
    };
    //
};

export default LanguageBar;
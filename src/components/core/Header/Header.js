import BaseComponent from "../BaseComponent/BaseComponent";
import headerTemplate from "./header.hbs";
import "./header.scss";

import { coreComponents } from "../../../utils/utils";

import LanguageBar from "./LanguageBar/LanguageBar";

/**
 * Header creates a new HTMLHeader element.
 * @class
 * @extends BaseComponent
 */
class Header extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     * @see BaseComponent.templateData
     * @see BaseComponent.subComponents
     * @param {Boolean} navHovering A refference to the current "navLink" HTMLElement that is hovered on. For animation purpouses.
     * @see BaseComponent.eventHandlers
     * @see BaseComponent.animationsLoop 
     */
    constructor() {
        super();

        this.component = this.createElement("header");
        this.id = "header";
        this.template = headerTemplate;
        this.templateData = () => {
            const { title, nav } = this.currentLang.header;
            const { navL, main, navR } = nav;
            navR.content.title = Object.keys(navR.content)[0];
            return { title, navL, main, navR, langs: this.langs };
        };
        this.subComponents = [
            () => new LanguageBar().render(),
        ];
        this.navHovering = null;
        
        /**
         * All values need to be reset so it doesnt remain a in some random position with some random opacity.
         * The transitionDuration is set back to .2s.
         * The textShadow is removed.
         * The opacity is set to 1.
         */
        this.eventHandlers = [
            { targetClass: ".navSections", event: "onmouseenter", handler: (e) => {
                if (!e.target.className.includes("navSectionM")) e.target.classList.add("navSectionHover")
            }},
            { targetClass: ".navSections", event: "onmouseleave", handler: (e) => {
                if (!e.target.className.includes("navSectionM")) e.target.classList.remove("navSectionHover")
            }},

            { targetClass: ".pageNavLinks", event: "onmouseenter", handler: (e) => {this.navHovering = e.target} },
            { targetClass: ".pageNavLinks", event: "onmouseleave", handler: (e) => {
                this.navHovering = null;

                e.target.style.transitionDuration = "0.2s";
                e.target.style.opacity = "1";
                e.target.style.textShadow = "none";
                e.target.style.transform = `translate(0px, 0px) skew(0deg, 0deg)`;
            }},
        ];

        this.animationsLoop([
            this.animateGhostTitle,
            this.animateNavLinks,
            this.handleMainLink
        ]);
    };

    /**
     * Method applying a style transform (translate, skewX, scale) to the secondary header title of the current component "this.component".
     * The values are randomly generated using the helper "this.random" function.
     * @see BaseComponent.random
     * Checks if the "ghostTitle" exists in order to manipulate it.
     * Checks if the imported coreComponents.mainCanvas.humanShapeAnimation is running in order to add a bigger offset to the randomly generated values.
     */
    animateGhostTitle = () => {
        const ghostTitle = this.component.querySelector("#headerGhostTitle");
        const { alpha } = coreComponents.mainCanvas.humanShapeAnimation;

        if (ghostTitle) {
            const offset = ghostTitle.offsetHeight - (12 - 15 * alpha);
            const posX = super.random(offset);
            const posY = super.random(offset);

            ghostTitle.style.transform = `translate(${posX}px, ${posY}px) skewX(-${alpha * 20}deg) scale(${1 + (alpha / 2)}, ${1 + (alpha / 2)})`;
        };
    };

    /**
     * Method applying a style transform, opacity change, and a textShadow (translate, skew) to the current "navLink" that the mouse is hovering over "this.navHovering" of the current component "this.component".
     * The values are randomly generated using the helper "this.random" function.
     * The opacity has a minimum of .5.
     * @see BaseComponent.random
     * Sets the transition duration to 0s while animating on account that it initially is at .2s which is needed for the dropdown transition (done with css).
     */
    animateNavLinks = () => {
        if (this.navHovering !== null) {
            const offset = 2;
            const skewX = this.random(offset);
            const skewY = this.random(offset);
            const posX = this.random(offset);
            const posY = this.random(offset);

            this.navHovering.style.transitionDuration = "0s";
            this.navHovering.style.opacity = this.random() >= .5 ? `${this.random() + .5}` : ".5";
            this.navHovering.style.textShadow = "0 0 3px white";
            this.navHovering.style.transform = `translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg)`;
        };
    };

    /**
     * Method checking the current path in order to show or hide the main page link.
     * Applying a style transform, opacity change, and a zIndex change based on the currrent path.
     * Link enters and exits with a slide animation.
     */
    handleMainLink = () => {
        const path = window.location.pathname.split("/").pop();
        const navMain = this.component.querySelector(".navMain");
        
        navMain.style.transform = path === "" ? "translateY(0)" : "translateY(100%)";
        navMain.style.opacity = path === "" ? "0" : "1";
        navMain.style.zIndex = path === "" ? "-1" : "0";
    };
};

export default Header;
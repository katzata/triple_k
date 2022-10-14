import BaseComponent from "../BaseComponent/BaseComponent";
import headerTemplate from "./header.hbs";
import "./header.scss";

import { coreComponents } from "../../../utils/utils";

import LanguageBar from "./LanguageBar/LanguageBar";

class Header extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("header");
        this.id = "header";
        this.template = headerTemplate;
        this.templateData = () => {
            const { title, nav } = this.currentLang.header;
            const { navL, main, navR } = nav;
            
            return { title, navL, main, navR, langs: this.langs };
        };
        this.subComponents = [
            () => new LanguageBar().render(),
        ];
        this.navHovering = null;
        this.generateTempalte = headerTemplate;
        this.ghostTitleOffset = null;
        
        this.eventHandlers = [
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

    handleMainLink = () => {
        const path = window.location.pathname.split("/").pop();
        const navMain = this.component.querySelector(".navMain");
        
        navMain.style.transform = path === "" ? "translateY(0)" : "translateY(100%)";
        navMain.style.opacity = path === "" ? "0" : "1";
        navMain.style.zIndex = path === "" ? "-1" : "0";
    };
};

export default Header;
import BaseComponent from "../BaseComponent/BaseComponent";
import headerTemplate from "./header.hbs";
import "./header.scss";

import LanguageBar from "./LanguageBar/LanguageBar";

class Header extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("header");
        this.template = headerTemplate;
        this.templateData = () => {
            const { title, nav } = this.currentLang.header;
            const { navL, main, navR } = nav;
            
            return { title, navL, main, navR, langs: this.langs };
        };
        this.subComponents = [
            this.generateNav,
            () => new LanguageBar().render(),
        ];
        this.navHovering = null;
        this.generateTempalte = headerTemplate;
        
        this.animationsLoop([
            this.animateGhostTitle,
            this.animateNavLinks
        ]);
    };

    generateNav = () => {
        const { nav } = this.currentLang.header;
        
        const content = [nav.navL, nav.main, nav.navR].map((el, idx) => {
            const links = Object.entries(el.content).map(([title, href]) => {
               const link = this.createElement("a", { href, className: "navLinks", textContent: title });

                link.onmouseenter = (e) => {this.navHovering = e.target};
                link.onmouseleave = (e) => {
                    this.navHovering = null;

                    e.target.style.transitionDuration = "0.2s";
                    e.target.style.opacity = "1";
                    e.target.style.textShadow = "none";
                    e.target.style.transform = `translate(0px, 0px) skew(0deg, 0deg)`;
                };

                return link;
            });

            if (idx !== 1) {
                return [
                    this.createElement("p", { className: "navSectionTitle", textContent: el.title }),
                    this.createElement("div", { className: "linksContainer" }, links)
                ];
            } else {
                return [this.createElement("a", { href: "/", className: "navLinks navMain", textContent: el.title })];
            };
        });

        const sections = ["navSectionL", "navSectionM", "navSectionR"].map((el, idx) => {
            return this.createElement("div", { className: `navSections ${el}` }, content[idx]);
        });

        return this.createElement("nav", {}, sections);
    };

    animateGhostTitle() {
        const ghostTitle = document.querySelector("#headerGhostTitle");
        
        if (ghostTitle) {
            const offset = ghostTitle.offsetHeight - 12;
            const posX = super.random(offset);
            const posY = super.random(offset);

            ghostTitle.style.transform = `translate(${posX}px, ${posY}px)`;
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
};

export default Header;
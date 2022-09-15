import BaseComponent from "../BaseComponent/BaseComponent";
import headerTemplate from "./header.hbs";
import "./header.scss";

// import { capitalise } from "../../../utils/utils";

class Header extends BaseComponent {
    constructor(text) {
        super();
        const { title, nav } = text;
        const { navL, main, navR } = nav;

        this.component = document.createElement("header");
        this.template = headerTemplate({ title, navL, main, navR });
        this.navHovering = null;
        
        this.animationsLoop([
            this.animateGhostTitle,
            this.animateNavLinks
        ]);
        
        this.onLoad([
            this.navLinkListeners
        ]);
    };

    animateGhostTitle() {
        const ghostTitle = document.querySelector(".headerGhostTitle");
        const offset = 10;
        const posX = super.random(offset);
        const posY = super.random(offset);

        ghostTitle.style.transform = `translate(${posX}px, ${posY}px)`;
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

    navLinkListeners = () => {
        const links = document.querySelectorAll(".navLinks");

        for (const link of links) {
            if (link.className === "navLinks") {
                link.addEventListener("mouseenter", (e) => {this.navHovering = e.target});
                link.addEventListener("mouseleave", (e) => {
                    this.navHovering = null;
                    
                    e.target.style.transitionDuration = "0.2s";
                    e.target.style.opacity = "1";
                    e.target.style.textShadow = "none";
                    e.target.style.transform = `translate(0px, 0px) skew(0deg, 0deg)`;
                });
            };
        };
    };
}

export default Header;
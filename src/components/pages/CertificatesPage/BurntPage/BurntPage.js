import BaseComponent from "../../../core/BaseComponent/BaseComponent";
import burntPageTemplate from "./burntPage.hbs";
import "./burntPage.scss";

import { coreComponents } from "../../../../utils/utils";

class BurntPage extends BaseComponent {
    constructor({ title, index }) {
        super();

        this.burntPagesContent = {
            html_css: {
                title: "HTML & CSS",
                grade: "5.94/6.00"
            },
            js_programming_fundamentals: {
                title: "Programming Fundamentals with JS",
                grade: "6.00/6.00"
            },
            js_advanced: {
                title: "JS Advanced",
                grade: "6.00/6.00"
            },
            js_applications: {
                title: "JS Applications",
                grade: "6.00/6.00"
            },
            js_angular: {
                title: "Angular",
                grade: "5.00/6.00"
            },
            js_react: {
                title: "React",
                grade: "6.00/6.00"
            },
            programming_basics: {
                title: "Programming Basics",
                grade: "6.00/6.00"
            },
        };

        this.component = this.createElement("div")
        this.className = "burntPage";
        this.template = burntPageTemplate;
        this.templateData = () => this.burntPagesContent[title];

        this.index = index;
        this._isVisible = false;
        this.frameIndex = 1;
        this.totalFrames = 95;
        this.count = 0;

        this.animationsLoop([
            this.handleAnimation
        ], Math.floor(1000 / 120));
    };

    handleAnimation = () => {
        const { humanShapeAnimation } = coreComponents.mainCanvas
        const image = this.component.children[0].children[0].children[0];

        image.setAttribute("href", `../../../../assets/gfx/img/disolve_animation/burning_paper${this.frameIndex}.png`);
        if (!humanShapeAnimation.fadeIn && humanShapeAnimation.alpha < 0.45) {
            this.isVisible = false;
        };

        if (this.isVisible) {
            if (this.frameIndex < 95) this.frameIndex++;
        } else {
            if (this.frameIndex > 1) this.frameIndex--;
        };
    };

    set isVisible(state) {
        this._isVisible = state;
    };

    get isVisible() {
        return this._isVisible;
    };
};

export default BurntPage;
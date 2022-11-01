import BaseComponent from "../../../core/BaseComponent/BaseComponent";
import burntPageTemplate from "./burntPageSvg.hbs";
import "./burntPageSvg.scss";
import burntPagesContent from "./burntPagesContent";

import { coreComponents } from "../../../../utils/utils";

class BurntPage extends BaseComponent {
    constructor({ image, title, index }) {
        super();

        this.component = this.createElement("div");
        this.component.className = `burntPage burntPage${image.slice(image.length - 2)}`;
        this.isFront = image.slice(image.length - 1) === "f";
        this.component.dataset.disolve = "0";
        this.template = burntPageTemplate;
        this.templateData = () => {
            burntPagesContent[title].index = index;
            burntPagesContent[title].image = image;
            burntPagesContent[title].isFront = this.isFront;
            burntPagesContent[title].file = title;
            burntPagesContent[title].mask = burntPagesContent.mask;

            return burntPagesContent[title];
        };

        this._isDisolving = false;
        this.frameIndex = 0;
        this.count = 0;

        this.animationsLoop([
            this.handleAnimation
        ]);
    };

    handleAnimation = () => {
        const { humanShapeAnimation } = coreComponents.mainCanvas
        
        if (this.component.dataset.disolve === "1") {
            const maskImage = this.component.querySelector("mask>image");
            const currentNormalHref = `../../../../assets/gfx/img/disolve_animation/burning_paper${this.frameIndex}.png`;
            const currentInvertedlHref = `../../../../assets/gfx/img/disolve_animation_inverted/burning_paper${this.frameIndex}.png`;

            if (maskImage.getAttribute("href") !== currentNormalHref) {
                maskImage.setAttribute("href", currentInvertedlHref);
            };
        
            if (this.component.dataset.disolve === "1") {
                this.isDisolving = true;
            };

            if (!humanShapeAnimation.fadeIn && humanShapeAnimation.alpha < 0.45) {
                this.isDisolving = false;
            };

            if (this.isDisolving) {
                if (this.frameIndex < 94) this.frameIndex += 2;
            } else {
                if (this.frameIndex > 0) this.frameIndex -= 2;
                if (this.frameIndex === 0) {
                    this.component.dataset.disolve = "0";
                };
            };
        };
    };

    set isDisolving(state) {
        this._isDisolving = state;
    };

    get isDisolving() {
        return this._isDisolving;
    };
};

export default BurntPage;
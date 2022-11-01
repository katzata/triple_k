import BaseComponent from "../../../core/BaseComponent/BaseComponent";
import burntPageTemplate from "./burntPage.hbs";
import "./burntPage.scss";
import burntPagesContent from "./burntPagesContent";

import { coreComponents } from "../../../../utils/utils";

class BurntPage extends BaseComponent {
    constructor({ image, title, index }) {
        super();

        this.component = this.createElement("canvas");
        this.component.className = `burntPage burntPage${image.slice(image.length - 2)}`;
        this.component.width = 780;
        this.component.height = 1122;

        this.ctx = this.component.getContext("2d");

        this.certificate = new Image();
        this.certificate.src = `../../../../assets/certificates/img/${image}.png`;

        this.isFront = image.slice(image.length - 1) === "f";
        this.component.dataset.disolve = "0";
        this.burntPages = burntPagesContent.mask;
        this.burntPage = burntPagesContent.burntPage
        console.log(this.burntPages);
        // this.template = burntPageTemplate;
        // this.templateData = () => {
        //     burntPagesContent[title].index = this.index;
        //     burntPagesContent[title].image = image;
        //     burntPagesContent[title].isFront = this.isFront;
        //     burntPagesContent[title].file = title;

        //     return burntPagesContent[title];
        // };
        this.index = index;
        this._isDisolving = false;
        this.frameIndex = 0;
        this.totalFrames = this.burntPages.length;
        this.count = 0;

        this.animationsLoop([
            this.handleBurntPages
        ]);
    };

    handleBurntPages = () => {
        if (this.burntPages.normal.length > 0 && this.burntPages.normal.length > 0) {
            this.ctx.clearRect(0, 0, this.component.width, this.component.height);
            // this.ctx.fillRect(0, 0, this.component.width, this.component.height);
            // this.ctx.globalCompositeOperation = "source-over";
            // this.ctx.globalCompositeOperation = "screen";
            // this.ctx.drawImage(this.certificate, 0, 0, this.component.width, this.component.height);

            this.handleDisolve();
        };
    };

    handleDisolve() {
        const { humanShapeAnimation } = coreComponents.mainCanvas;
        
        // this.ctx.globalCompositeOperation = "screen";
        // this.ctx.drawImage(this.certificate, 0, 0, this.component.width, this.component.height);
        this.ctx.save();
        this.ctx.drawImage(this.burntPage, 0, 0, this.component.width, this.component.height);
        // this.ctx.drawImage(this.burntPage, 0, 0, this.component.width, this.component.height);
        this.ctx.globalCompositeOperation = "source-atop";
        this.ctx.drawImage(this.burntPages.normal[this.frameIndex], 0, 0, this.component.width, this.component.height);

        this.ctx.globalCompositeOperation = "source-atop";
        this.ctx.drawImage(this.burntPage, 0, 0, this.component.width, this.component.height);
        // this.ctx.clip();
        this.ctx.restore();

        // this.ctx.save();
        // this.ctx.globalCompositeOperation = "destination-atop";
        // this.ctx.restore();

        // this.ctx.save();
        // // this.ctx.globalCompositeOperation = "destination-atop";
        // this.ctx.drawImage(this.burntPage, 0, 0, this.component.width, this.component.height);
        // this.ctx.restore();

        // this.ctx.save();
        // this.ctx.globalCompositeOperation = "screen";
        // this.ctx.drawImage(this.burntPages.inverted[this.frameIndex], 0, 0, this.component.width, this.component.height);
        // this.ctx.restore();

        
        if (this.component.dataset.disolve === "1") {
            this.isDisolving = true;
        };
        
        if (!humanShapeAnimation.fadeIn && humanShapeAnimation.alpha < 0.45) {
            this.isDisolving = false;
        };
        
        if (this.isDisolving) {
            if (this.frameIndex < this.burntPages.normal.length - 1) this.frameIndex++;
            // console.log(this.burntPages.length, this.frameIndex);
        } else {
            if (this.frameIndex > 0) this.frameIndex--;
            if (this.frameIndex === 0) this.component.dataset.disolve = "0";
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
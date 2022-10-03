import BaseComponent from "../../../core/BaseComponent/BaseComponent";
import "./distortionCanvas.scss";
import noiseFrames from "../../../../assets/gfx/img/noise.png";

class DistortionCanvas extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("canvas", { id:"distortionCanvas" });
        this.component.width = 192;
		this.component.height = 280;
        
        this.ctx = this.component.getContext("2d");

        this._isVisible = false;
        this.noise = this.generateImage();
        this.currentFrame = 0;
        this.animationRunning = false;
        this.offsetY = 3;
        this.alpha = 0;
        this.alphaIncrement = 0.02;
        this.alphaMax = 0.28;

        this.animationsLoop([
            this.canvasHandler
        ], Math.ceil(1000 / 30));
    };

    generateImage() {
        const image = new Image();
        image.src = noiseFrames;

        return image;
    };

    canvasHandler = () => {
        this.handleVisibility();
        
        if (this.animationRunning) {
            this.handleSize();
            this.handleAnimation();
        };

        if (!this.animationRunning && this.alpha !== 0) this.alpha = 0;
    };

    handleVisibility() {
        if (this.animationRunning) {
            if (this.component.style.zIndex !== "2") this.component.style.zIndex = "2";
        } else {
            if (this.component.style.zIndex !== "0") this.component.style.zIndex = "0";
        };
        // if (this._isVisible) {
        //     this.animationRunning = true;
            
        //     if (this.alpha < this.alphaMax) {
        //         this.alpha += this.alphaIncrement;
        //         if (this.alpha > this.alphaMax) this.alpha = this.alphaMax;
        //     };

        //     if (this.component.style.zIndex !== "2") this.component.style.zIndex = "2";
        // } else {
        //     this.alpha = 0;
        //     this.animationRunning = false;
        //     if (this.component.style.zIndex !== "0") this.component.style.zIndex = "0";
        // };
    };

    handleSize() {
        this.component.width = this.component.parentElement.offsetWidth;
        this.component.height = this.component.parentElement.offsetHeight;
        // console.log("x", this.component.parentElement);
    };

    handleAnimation() {
        const frameWidth = 190;
        const frameHeight = 277;
        const frameX = (this.currentFrame * frameWidth) + this.currentFrame * 2;
        const frameY = (this.offsetY * frameHeight) + this.offsetY * 2;
        
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.drawImage(this.noise, frameX, frameY, frameWidth, frameHeight, 0, 0, this.component.width, this.component.height);
        this.ctx.restore();

        if (this.currentFrame < 15) {
            this.currentFrame++;
        } else {
            this.currentFrame = 0;
            
            if (this.offsetY < 10) {
                this.offsetY++;
            } else {
                this.offsetY = 3;
            };
        };
    };

    set isVisible(toggle) {
        this._isVisible = toggle;
    };

    get isVisible() {
        return this._isVisible;
    };
};

export default DistortionCanvas;
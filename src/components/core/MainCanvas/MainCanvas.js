import BaseComponent from "../BaseComponent/BaseComponent";
import "./mainCanvas.scss";

import HumanShapeAnimation from "./HumanShapeAnimation/HumanShapeAnimation";
import HaloAnimation from "./HaloAnimation/HaloAnimation";
import FogAnimation from "./FogAnimation/FogAnimation";
import BloodTrails from "./BloodTrails/BloodTrails";

const bg = new Image();
bg.src = "../../../../assets/gfx/img/canvas_bg.png";

class MainCanvas extends BaseComponent {
    constructor() {
        super();
        const { innerWidth, innerHeight } = window;

        this.component = this.createElement("canvas");
        this.component.width = innerWidth;
		this.component.height = innerHeight;

        this.ctx = this.component.getContext("2d");

        this.bgWidth = 966;
        this.bgHeight = 563;
        
        this.fogAnimation = new FogAnimation();
        this.fogAnimationRunning = false;
        this.siblings = [];
        this.siblingsReady = false;

        this.humanShapeAnimation = new HumanShapeAnimation();
        this.humanShapeAnimationInterval = () => Math.ceil(Math.random() * 8000);
        this.humanShapeAnimationIntervalSet = false;

        this.haloAnimation = new HaloAnimation();
        this.bloodTrails = new BloodTrails();

        this.animationsLoop([
            this.canvasHandler
        ]);
    };

    canvasHandler = () => {
        this.handleDimentions();
        this.handleVisibility();

        if (this.fogAnimationRunning || this.humanShapeAnimation.running) {
            this.ctx.clearRect(0, 0, this.component.width, this.component.height);
        };
        this.handleBg();

        if (this.fogAnimationRunning) this.handleFog();
        if (!this.fogAnimationRunning) {
            this.handleHumanShape()
            this.handleBloodTrails();
            this.handleHalo();
        };
    };

    handleDimentions() {
        this.component.width = window.innerWidth;
        this.component.height = window.innerHeight;
    };

    handleVisibility() {
        if (this.fogAnimationRunning) {
            if (this.component.style.zIndex !== "400") this.component.style.zIndex = "400";
        } else {
            if (this.component.style.zIndex !== "-1") this.component.style.zIndex = "-1";
        };
    };

    handleFog() {
        if (this.fogAnimationRunning) {
            if (!this.fogAnimation.fadeIn && !this.siblingsReady) this.fogAnimation.fadeIn = true;
        };

        const lastParticle = this.fogAnimation.particles[this.fogAnimation.density - 1];
        
        if (this.siblingsReady && lastParticle && lastParticle.alpha === 0) {
            this.fogAnimation.reset();
            this.fogAnimationRunning = false;
            this.siblingsReady = false;
        };
        
        this.fogAnimation.draw(this.ctx, this.siblingsReady, this.handleSiblings);
    };
    
    handleSiblings = (fadeOutTriggerParticle, fadeInTriggerParticle) => {
        if (!this.siblingsReady && fadeOutTriggerParticle.alpha === 1) {
            for (let i = 0; i < this.siblings.length; i++) {
                this.siblings[i].className = "simpleFadeOut";

                this.siblings[i].onanimationend = (e) => {
                    if (e.animationName === "simpleFadeOut") {
                        if (this.siblings[i].tagName !== "MAIN") {
                            this.siblings[i].render();
                        } else {
                            this.page.render();
                        };

                        if (i === this.siblings.length - 1) this.siblingsReady = true;
                    };
                };
            };
        };

        if (this.siblingsReady && fadeInTriggerParticle.alpha === 0 && this.siblings[this.siblings.length - 1].className !== "simpleFadeIn") {
            for (const sibling of this.siblings) sibling.className = "simpleFadeIn";
        };
    };

    handleHumanShape() {
        if (this.humanShapeAnimationIntervalSet && !this.humanShapeAnimation.running && this.humanShapeAnimation.maxOpacityDurationCounter === 0) {
            this.humanShapeAnimationIntervalSet = false;
            this.haloAnimation.running = false;
            this.bloodTrails.running = false;
            this.humanShapeAnimation.maxOpacityDurationCounter = this.humanShapeAnimation.maxOpacityDuration;
        };
        
        if (!this.humanShapeAnimation.running && !this.humanShapeAnimationIntervalSet) {
            this.humanShapeAnimationIntervalSet = true;

            setTimeout(() => {
                this.humanShapeAnimation.running = true;
                this.humanShapeAnimation.fadeIn = true;
                this.haloAnimation.running = true;
                this.bloodTrails.running = true;
            }, this.humanShapeAnimationInterval());
        };
        
        if (this.humanShapeAnimation.running) this.humanShapeAnimation.draw(this.ctx);
    };

    handleHalo() {
        if (this.haloAnimation.running) {
            this.haloAnimation.alpha = this.humanShapeAnimation.alpha;
        };

        this.haloAnimation.draw(this.ctx)
    };

    handleBg() {
        const { innerWidth, innerHeight } = window;
        const screenCalc = innerWidth / innerHeight;
        const widthCalc = this.component.height * (this.bgWidth / this.bgHeight);
        const heightCalc = this.component.width * (this.bgHeight / this.bgWidth);
        const posX = this.component.width / 2;
        const posY = this.component.height / 2;
        const translate = screenCalc >= 1.48 ? [-(this.component.width / 2), -(heightCalc / 2)] : [-(widthCalc / 2), -(this.component.height / 2)];
        const bgImage = (x, y) => this.ctx.drawImage(
            bg,
            0,
            0,
            this.bgWidth,
            this.bgHeight,
            x ? x : posX,
            y ? y : posY,
            screenCalc >= 1.7 ? this.component.width : widthCalc,
            screenCalc < 1.7 ? this.component.height : heightCalc
        );
        // console.log(screenCalc);
        this.ctx.save();
        this.ctx.translate(...translate);
        this.ctx.globalAlpha = this.humanShapeAnimation.alpha / 2.2;
        bgImage();
        // this.ctx.drawImage(
        //     bg,
        //     0,
        //     0,
        //     this.bgWidth,
        //     this.bgHeight,
        //     posX,
        //     posY,
        //     screenCalc >= 1.48 ? this.component.width : widthCalc,
        //     screenCalc < 1.48 ? this.component.height : heightCalc
        // );
        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(...translate);
        this.ctx.globalAlpha = 0/* this.humanShapeAnimation.alpha / 2.2 */;
        const testX = this.component.width / 2 + this.random(2);
        const testY = this.component.height / 2 + this.random(2);

        bgImage(testX, testY);
        this.ctx.restore();
    };

    handleBloodTrails() {
        if (this.bloodTrails.running) {
            this.bloodTrails.draw(this.ctx);
            this.bloodTrails.alpha = this.humanShapeAnimation.alpha;
        };
    };

    set fogAnimationRunning(state) {
        this._fogAnimationRunning = state;
    };

    get fogAnimationRunning() {
        return this._fogAnimationRunning;
    };

    render(sectionsAndContent) {
        this.siblingsAndContent = sectionsAndContent;

        return super.render();
    };
};

export default MainCanvas;
import BaseComponent from "../BaseComponent/BaseComponent";
import "./mainCanvas.scss";

import Background from "./Background/Background";
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

        this.background = new Background();
        
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
        
        if (this.fogAnimationRunning) this.handleFog();
        if (!this.fogAnimationRunning) {
            this.handleBg();
            this.handleHumanShape()
            this.handleBloodTrails();
            this.handleHalo();
            this.handleNonSiblings();
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

    handleNonSiblings() {
        if (this.humanShapeAnimation.running) {
            const navTitles = Array.from(document.querySelectorAll(".navSectionTitle"));
            const hrTop = document.querySelector("#hrTop");
            const hrBottom = document.querySelector("#hrBottom");
            
            if (this.humanShapeAnimation.alpha > this.humanShapeAnimation.alphaIncrement) {
                const alphaCalc = Math.random() >= .5 ? 1 - (this.humanShapeAnimation.alpha + .5) : 0;

                if (alphaCalc >= 0) {
                    hrTop.style.opacity = alphaCalc;
                    hrBottom.style.opacity = alphaCalc;
                    
                    for (const navTitle of navTitles) {
                        navTitle.style.backgroundColor = `rgba(0, 0, 0, ${alphaCalc})`;
                        navTitle.style.boxShadow = `0 0 3px 2px rgba(0, 0, 0, ${alphaCalc})`;
                    };
                };
            } else {
                if (hrTop.style.opacity !== 1) {
                    hrTop.style.opacity = 1;
                    hrBottom.style.opacity = 1;

                    for (const navTitle of navTitles) {
                        navTitle.style.backgroundColor = `rgba(0, 0, 0, 1)`;
                        navTitle.style.boxShadow = `0 0 3px 2px rgba(0, 0, 0, 1)`;
                    };
                };
            };
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
        if (this.humanShapeAnimation.running) {
            this.background.alpha = this.humanShapeAnimation.alpha;
            this.background.draw(this.ctx);
        };
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
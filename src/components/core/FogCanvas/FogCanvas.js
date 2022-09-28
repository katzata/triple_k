import BaseComponent from "../BaseComponent/BaseComponent";
import "./fogCanvas.scss";

import FogParticle from "./Fog/Fog";

class FogCanvas extends BaseComponent {
    constructor() {
        super();
        const { innerWidth, innerHeight } = window;

        this.component = this.createElement("canvas");
        this.scale = 1;
        this.component.width = window.innerWidth;
		this.component.height = window.innerHeight;

        this.ctx = this.component.getContext("2d");
        
        this._isVisible = false;
        this._fadeIn = false;
        this.particleSize = (innerWidth < innerHeight ? innerWidth : innerHeight) / 1.65;
        this.fogDensity = 0;
        // this.fogVelocity = 3 * this.scale;
        this.fogVelocity = 6 * this.scale;
        this.fogParticles = [];
        this.siblingsReady = false;
        this.triggerParticle = Math.floor(this.fogDensity / 4);

        this.siblings = [];

        this.animationsLoop([
            this.canvasHandler
        ]);
    };

    canvasHandler = () => {
        this.handleVisibility();

        if (this.fogPrepped) {
            this.component.width = window.innerWidth * this.scale;
            this.component.height = window.innerHeight * this.scale;

            this.ctx.clearRect(0, 0, this.component.width, this.component.height);

            this.particlesFade();
            this.drawFog();
            this.handleSiblings();

            if (this.siblingsReady && this._isVisible && this.fogParticles[this.triggerParticle].fadeIn === false && this.fogParticles[this.fogParticles.length - 1].alpha === 0) {
                this._isVisible = false;
            };
        };
    };
    
    setDensity() {
        const { innerWidth, innerHeight } = window;
        const density = Math.ceil((innerWidth > innerHeight ? innerWidth : innerHeight) / 6);
        return density < 100 ? 100 : density;
    };

    prepareFog() {
        this.fogDensity = this.setDensity();
        // alert(this.fogDensity)
        const maxX = this.component.width - this.particleSize;
        const maxY = this.component.height - this.particleSize;

        for (let i = 0; i < this.fogDensity; i++) {
            const random = (num) => Math.floor(Math.random() * num);
            
            const posX = random(maxX);
            const posY = random(maxY);
            const velocityX = Math.random() >= .5 ? this.fogVelocity : -this.fogVelocity;
            const velocityY = Math.random() >= .5 ? this.fogVelocity : -this.fogVelocity;

            const particle = new FogParticle({
                size: this.particleSize,
                alphaDelay: Math.ceil(i / 8),
                x: posX,
                y: posY,
                maxX,
                maxY,
                velocityX: random(velocityX) + 1,
                velocityY: random(velocityY) + 1
            });

            this.fogParticles.push(particle);
        };

        this.fogPrepped = true;
    };

    handleVisibility() {
        if (this._isVisible) {
            if (this.fogParticles.length === 0) this.prepareFog();
            if (this.component.style.zIndex !== "400") this.component.style.zIndex = "400";
        } else {
            if (!this.fogPrepped) this.fogPrepped = false;
            if (this.fogParticles.length > 0) this.fogParticles = [];
            if (this.component.style.zIndex !== "-1") this.component.style.zIndex = "-1";
            if (this.siblingsReady) this.siblingsReady = false;
        };
    };
    
    particlesFade() {
        const count = this.fogParticles.length;

        if (count > 0) {
            if (this._fadeIn === false && this.siblingsReady) {
                for (let i = 0; i < count; i++) {
                    if (this.fogParticles[i].fadeIn) this.fogParticles[i].fadeIn = false;
                };
            };
    
            if (this.siblingsReady && this.fogParticles[count - 1].alpha >= 1 && this.fogParticles[count - 1].fadeIn) {
                this._fadeIn = false;
            };
        };
    };

    handleSiblings() {
        const fadeOutTriggerParticle = this.fogParticles[this.triggerParticle];
        const fadeInTriggerParticle = this.fogParticles[this.triggerParticle];
        const lastParticle = this.fogParticles[this.fogDensity - 1];
        // if (fadeOutTriggerParticle.alpha === 1 && fadeOutTriggerParticle.fadeIn) {
        //     for (const sibling of this.siblings) {
        //         sibling.className = "simpleFadeOut";
        //     };

        //     document.querySelector("main").className = "simpleFadeOut";
        // };
        // console.log(fadeInTriggerParticle);

        if (!this.siblingsReady && fadeInTriggerParticle && lastParticle) {
            const main = document.querySelector("main");

            if (main.className !== "simpleFadeIn" && fadeInTriggerParticle.alpha === 0 && !fadeInTriggerParticle.fadeIn) {
                for (const sibling of this.siblings) {
                    sibling.className = "simpleFadeIn";
                };
                
                main.className = "simpleFadeIn";
            };
            
            if (fadeOutTriggerParticle.alpha === 1 && fadeOutTriggerParticle.fadeIn) {
                for (const sibling of this.siblings) {
                    sibling.className = "simpleFadeOut";

                    if (sibling.tagName !== "MAIN") {
                        sibling.onanimationend((e) => {
                            if (e.animationName === "simpleFadeOut") {
                                sibling.remove();
                                sibling.render();
                            };
                        });
                    } else {
                        sibling.onanimationend = (e) => {
                            if (e.animationName === "simpleFadeOut") {
                                sibling.remove();
                                const content = this.page.render();
                                if (content) sibling.replaceChildren(content);
                            };
                        };
                    };
                };
                
                this.siblingsReady = true;
            };
        };

        if (this.siblingsReady && fadeInTriggerParticle.alpha === 0) {
            // console.log("asd", fadeInTriggerParticle);
            if (this.siblings[this.siblings.length - 1].className !== "simpleFadeIn") {
                for (const sibling of this.siblings) {
                    sibling.className = "simpleFadeIn";

                    if (sibling.tagName !== "MAIN") {
                        sibling.render();
                        sibling.append();
                    } else {
                        document.querySelector("#root").appendChild(sibling);
                    };
                };
            };
        };

        // console.log(this.siblings);
        // const fadeInTriggerParticleReady = this.fogParticles[this.triggerParticle].fadeIn === true && this.fogParticles[this.triggerParticle].alpha === 1;
        // const reversed = this.fogParticles.length - this.triggerParticle;
        // const fadeOutTriggerParticleReady = this.fogParticles[reversed].fadeIn === false && this.fogParticles[reversed].alpha === 0;

        // if (!this.siblingsReady && fadeInTriggerParticleReady) {
        //     for (const [sibling, content] of this.siblingsAndContent) {
        //         sibling.className = "simpleFadeOut";
                
        //         sibling.onanimationend = (e) => {
        //             if (e.animationName === "simpleFadeOut") {
        //                 if (e.target.tagName !== "MAIN") {
        //                     sibling.replaceChildren(...content.render().children);
        //                 } else {
        //                     sibling.replaceChildren(content);
        //                 };
        //             };
        //         };
        //     };

        //     this.siblingsReady = true;
        // };

        // if (this.siblingsReady && fadeOutTriggerParticleReady) {
        //     for (const [sibling] of this.siblingsAndContent) {
        //         sibling.className = "simpleFadeIn";
        //     };
        // };
    };

    drawFog() {
        const { width, height } = this.component;
        const count = this.fogParticles.length;

        for (let i = 0; i < count; i++) {
            this.fogParticles[i].render(this.ctx);
        };
    };

    removeCanvas() {
        this._isVisible = false;

        this.component.remove();
    };

    set isVisible(state) {
        this._isVisible = state;
    };

    get isVisible() {
        return this._isVisible;
    };

    set fadeIn(state) {
        this._fadeIn = state;
    };

    get fadeIn() {
        return this._fadeIn;
    };

    render(sectionsAndContent) {
        this.siblingsAndContent = sectionsAndContent;

        return super.render();
    };
};

export default FogCanvas;
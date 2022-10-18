import BaseComponent from "../BaseComponent/BaseComponent";
import "./mainCanvas.scss";

import Background from "./Background/Background";
import HumanShapeAnimation from "./HumanShapeAnimation/HumanShapeAnimation";
import HaloAnimation from "./HaloAnimation/HaloAnimation";
import FogAnimation from "./FogAnimation/FogAnimation";
import BloodTrails from "./BloodTrails/BloodTrails";


/**
 * MainCanvas creates a new HTMLCanvas element.
 * @class
 * @extends BaseComponent
 */
class MainCanvas extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @param {CanvasRenderingContext2D} ctx This canvas's rendering context.
     * 
     * @param {classInstance} background An animation class instance.
     * @see Background
     * 
     * @param {classInstance} fogAnimation An animation class instance.
     * @see FogAnimation
     * @param {Boolean} fogAnimationRunning Toggles the fog animation during a language change and pauses all other animations.
     * @param {Array} siblings An array that will contain all siblings that will be removed and reattached to the dom during the fog animation.
     * @param {Boolean} siblingsReady Indicates if the siblings have been reappended to the dom in order to trigger the fog animation fadeOut stage.
     * 
     * @param {classInstance} humanShapeAnimation An animation class instance.
     * @see HumanShapeAnimation
     * @param {Function} humanShapeAnimationInterval A function returning the interval between the human shape animation iterations.
     * @param {Boolean} humanShapeAnimationIntervalSet Indicates if the humanShapeAnimationInterval is set in order to block further setting until it is set to false.
     * 
     * @param {classInstance} haloAnimation An animation class instance.
     * @see HaloAnimation
     * 
     * @param {classInstance} bloodTrails An animation class instance.
     * @see BloodTrails
     */
    constructor() {
        super();
        const { innerWidth, innerHeight } = window;

        this.component = this.createElement("canvas");
        this.id = "mainCanvas";
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

    /**
     * Method that handles all the animations that are going to run on this canvas (this.component).
     * The handleDimentions and handleVisibility functions are always running (always needed).
     * The clearRect canvas context function runs only if an animation is running (fogAnimationRunning or humanShapeAnimation.running).
     * The fog animation has precedence over the other animations on account that it's connected to the language change. Therefore pausing the other animations if they are running.
     * Arrow function to keep the scope here.
     */
    canvasHandler = () => {
        this.handleDimentions();
        this.handleVisibility();
        
        if (this.fogAnimationRunning || this.humanShapeAnimation.running) {
            this.ctx.clearRect(0, 0, this.component.width, this.component.height);
        };
        
        if (this.fogAnimationRunning) this.handleFog();
        
        if (!this.fogAnimationRunning) {
            this.handleBg();
            this.handleHumanShape();
            this.handleBloodTrails();
            this.handleHalo();
            this.handleNonSiblings();
        };
    };

    /**
     * Method setting the canvas (this.component) width and height constantly so that if a resize should occur, all that's drawn on the canvas will keep its proportions and aspect ratio.
     */
    handleDimentions() {
        this.component.width = window.innerWidth;
        this.component.height = window.innerHeight;
    };

    /**
     * Method that sets the zIndex of the canvas when the fog animation is running.
     * Runs only when the fog animation is running.
     */
    handleVisibility() {
        if (this.fogAnimationRunning) {
            if (this.component.style.zIndex !== "400") this.component.style.zIndex = "400";
        } else {
            if (this.component.style.zIndex !== "-1") this.component.style.zIndex = "-1";
        };
    };

    /**
     * Method handling the fog animation start, finish, vlaues reset and drawing.
     * Also resets the siblingsReady state when the fog animation is complete.
     */
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
    
    /**
     * Method handling the mainCanvas siblings during the language change.
     * Setting a className to all siblings "simpleFadeOut" when needed.
     * Setting an animationend event hadler to first remove the siblings and then re-render them with the new language data and lastly re-append them to the dom.
     * Toggle the this.siblingsReady to true in order to start the fog animation fade out.
     * Arrow function to keep the scope here.
     * @param {FogParticle} fadeOutTriggerParticle An instance of the fogParticle class that acts as a key particle triggering the siblings fade out.
     * @see FogAnimation
     * @param {FogParticle} fadeOutTriggerParticle An instance of the fogParticle class that acts as a key particle triggering the siblings fade in.
     * @see FogAnimation
     */
    handleSiblings = (fadeOutTriggerParticle, fadeInTriggerParticle) => {
        if (!this.siblingsReady && fadeOutTriggerParticle.alpha === 1) {
            for (let i = 0; i < this.siblings.length; i++) {
                this.siblings[i].className = "simpleFadeOut";

                this.siblings[i].onanimationend = (e) => {
                    if (e.animationName === "simpleFadeOut") {
                        if (this.siblings[i].tagName !== "MAIN") {
                            this.siblings[i].render();
                        } else {
                            this.siblings[i].replaceChildren(this.page.render());
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

    /**
     * Method that handles elements from other components during the humanShapeAnimation.
     * Making style changes and reseting them on the start and end of the animation.
     */
    handleNonSiblings() {
        if (this.humanShapeAnimation.running) {
            const navTitles = Array.from(document.getElementsByClassName("navSectionTitle"));
            const hrTop = document.getElementById("hrTop");
            const hrBottom = document.getElementById("hrBottom");
            
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

    /**
     * Method handling the humanShapeAnimation and the accompanying animations.
     * If the human shape animation is not running and the this.humanShapeAnimationIntervalSet is false it sets the this.humanShapeAnimationIntervalSet to true and sets the interval timer.
     * Also resets all animation toggles for the human shape animation and the accompanying animations.
     */
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

    /**
     * Method handling the halo animation alpha and drawing on the canvas.
     */
    handleHalo() {
        if (this.haloAnimation.running) {
            this.haloAnimation.alpha = this.humanShapeAnimation.alpha;
        };

        this.haloAnimation.draw(this.ctx)
    };

    /**
     * Method handling the background animation alpha and drawing on the canvas.
     */
    handleBg() {
        if (this.humanShapeAnimation.running) {
            this.background.alpha = this.humanShapeAnimation.alpha + .2;
            this.background.draw(this.ctx);
        };
    };

    /**
     * Method handling the blood trails animation alpha and drawing on the canvas.
     */
    handleBloodTrails() {
        if (this.bloodTrails.running) {
            this.bloodTrails.draw(this.ctx);
            this.bloodTrails.alpha = this.humanShapeAnimation.alpha;
        };
    };

    /**
     * Sets the fog animation state.
     */
    set fogAnimationRunning(state) {
        this._fogAnimationRunning = state;
    };

    /**
     * Gets the fog animation state.
     */
    get fogAnimationRunning() {
        return this._fogAnimationRunning;
    };
};

export default MainCanvas;
import BaseComponent from "../../core/BaseComponent/BaseComponent";
import mainPageTemplate from "./mainPage.hbs";
import "./mainPage.scss";

import { coreComponents } from "../../../utils/utils";

/**
 * MainPage creates a new HTMLElement.
 * @class
 * @extends BaseComponent
 */
class MainPage extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     * @see BaseComponent.templateData
     * @see BaseComponent.subComponents
     * 
     * @param {HTMLCanvasElement} distortionCanvas A canvas element that wil run an animation over the main image(my photo).
     * @param {Boolean} distortionCanvasVisible A trigger toggling the distortionCanvas visibility.
     * @param {CanvasRenderingContext2D} distortionCanvasCtx The distortion canvas context.
     * @param {HTMLImageElement} distortionCanvasImage The distortion tileset which will be rendered for the distortion animation.
     * @param {Boolean} distortionCanvasAnimationRunning A trigger toggling the distortionCanvas animation running state.
     * @param {Number} distortionCanvasCurrentFrame The current frame (from the distortion tile set) to be drawn.
     * @param {Number} distortionCanvasAlpha The distortion canvas global alpha.
     * 
     * @param {Boolean} stackIconsDelay Toggles the stack icons transition duration between 0 and a pre-set value.
     * 
     * @see BaseComponent.childSubComponents
     * @see BaseComponent.eventHandlers
     * @see BaseComponent.animationsLoop 
     */
    constructor() {
        super();

        this.component = this.createElement("section");
        this.id = "mainPage";
        this.template = mainPageTemplate;
        this.templateData = () => {
            const stackIcons = Object.entries(this.generateIcons());
            
            for (const [section, icons] of stackIcons) {
                this.currentLang.mainPage.stackArticle.content[section].content = icons;
            };
            this.currentLang.mainPage.topArticle.age.content = `${this.setAge()}`;
            
            return { ...this.currentLang.mainPage, ...this.generateIcons() };
        };

        this.distortionCanvas = null;
        this.distortionCanvasVisible = null;
        this.distortionCanvasCtx = null;
        this.distortionCanvasImage = new Image();
        this.distortionCanvasAnimationRunning = false;
        this.distortionCanvasCurrentFrame = 0;
        this.distortionCanvasAlpha = 0;

        this.stackIconsDelay = false;

        this.childSubComponents = [];

        this.generateImageSection();

        this.animationsLoop([
            this.handleImages,
            this.handleDistortionCanvas,
            this.handleStackIcons
        ]);
    };

    /**
     * Method that calculates my age.
     * @returns {Number} My age calculated so that it s always updated.
     */
    setAge() {
		let age = Date.now() - new Date(1985, 4, 3).getTime();
		let ageDate = new Date(age);

		return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
	};

    /**
     * Method handling the generation of the page's image section (my image, skull image, distortion canvas).
     * Runs upon class initialisation.
     */
    generateImageSection() {
        this.generateDistortionCanvas();

        const mainAttr = {
            id: "mainImage",
            src: "../../../assets/gfx/img/kkk.png",
            alt: "creatura immortui"
        };

        const mainImage = this.createElement("img", mainAttr);

        const skullAttr = {
            id: "skullImage",
            src: "../../../assets/gfx/img/kkk_skull2.png",
            alt: "creatura mortua"
        }

        const skullImage = this.createElement("img", skullAttr);

        this.childSubComponents.push(["#imageContainer", skullImage]);
        this.childSubComponents.push(["#imageContainer", mainImage]);
    };

    /**
     * Method handling the generation of the page's distortion canvas.
     * Runs upon class initialisation inside the generateImageSection method.
     */
    generateDistortionCanvas() {
        this.distortionCanvas = this.createElement("canvas", { id: "distortionCanvas" });
        this.distortionCanvasCtx = this.distortionCanvas.getContext("2d");
        this.childSubComponents.push(["#imageContainer", this.distortionCanvas]);
        this.distortionCanvasImage.src = "../../../assets/gfx/img/noise.png";
    };

    /**
     * Method handling the generated images (my image, skull image) transformations (translate, skew, scaleY), filters (hue-rotate) and opacity during the human shape animation.
     * Always running.
     * Arrow function to keep the scope here.
     */
    handleImages = () => {
        const mainImage = this.component.querySelector("#mainImage");
        const skullImage = this.component.querySelector("#skullImage");
        const { mainCanvas } = coreComponents;
        const { alpha } = mainCanvas.humanShapeAnimation;

        if (mainImage && skullImage) {
            if (alpha !== 0) {
                const random = Math.random();
                const posX = this.random(alpha * 5);
                const posY = 0;
                const skewX = -random * (alpha * 8);
                const skewY = 0;
                const mainOpacity = random > .5 ? (random + .4) : (1 - (alpha - .2));
                const mainHue = this.random(0);
                const scaleY = 1 + alpha / 8;

                mainImage.style.transform = `translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg) scaleY(${scaleY})`;
                mainImage.style.filter = `hue-rotate(${mainHue}deg)`;
                mainImage.style.opacity = `${mainOpacity}`;
                
                skullImage.style.transform = `rotateZ(-4deg) translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg) scaleY(${scaleY})`;
            } else {
                if (mainImage && mainImage.style.opacity !== "1") {
                    mainImage.style.transform = `translate(0px, 0px) skew(0deg, 0deg)`;
                    mainImage.style.filter = `hue-rotate(0deg)`;
                    mainImage.style.opacity = "1";
                    
                    skullImage.style.transform = `rotateZ(-4deg) translate(0px, 0px) skew(0deg, 0deg)`;
                };
            };
        };
    };

    /**
     * Method handling the distortion canvas's width, height and zIndex.
     * The zIndex is based on the visibility toggle.
     * Also runs the handleCanvasAnimation method.
     * Always running.
     * Arrow function to keep the scope here.
     */
    handleDistortionCanvas = () => {
        this.distortionCanvas.width = this.distortionCanvas.parentElement ? this.distortionCanvas.parentElement.offsetWidth : 0;
        this.distortionCanvas.height = this.distortionCanvas.parentElement ? this.distortionCanvas.parentElement.offsetHeight : 0;

        if (this.distortionCanvasVisible) {
            if (this.distortionCanvas.style.zIndex !== "2") this.distortionCanvas.style.zIndex = "2";
        } else {
            if (this.distortionCanvas.style.zIndex !== "0") this.distortionCanvas.style.zIndex = "0";
        };

        this.handleCanvasAnimation();
    };

    /**
     * Method handling the coordinates of the images on the tileset, currentFrame, size and visibility.
     * Also handles the drawing of the individual frames on the canvas.
     */
    handleCanvasAnimation() {
        const { mainCanvas } = coreComponents;
        const { alpha, running } = mainCanvas.humanShapeAnimation;
        const frameWidth = 190;
        const frameHeight = 277;
        const frameX = (this.currentFrame * frameWidth) + this.currentFrame * 2;
        const frameY = (this.offsetY * frameHeight) + this.offsetY * 2;

        if (running && this.distortionCanvasImage) {
            if (!this.distortionCanvasVisible) this.distortionCanvasVisible = true;
            if (this.distortionCanvas) this.distortionCanvasAlpha = alpha / 2;

            this.distortionCanvasCtx.save();
            this.distortionCanvasCtx.globalAlpha = this.distortionCanvasAlpha;
            this.distortionCanvasCtx.drawImage(
                this.distortionCanvasImage,
                frameX,
                frameY,
                frameWidth,
                frameHeight,
                0,
                0,
                this.distortionCanvas.width,
                this.distortionCanvas.height
            );
            
            this.distortionCanvasCtx.restore();
        } else {
            if (this.distortionCanvasVisible) this.distortionCanvasVisible = false;
        };

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

    /**
     * Method handling the generation of all stack icons.
     * @returns {Object} All generated stack icons grooped in sections.
     */
    generateIcons() {
        const primaryStack = [
            { title: "HTML", icon: "../../../assets/gfx/icons/stack/html.svg" },
            { title: "CSS", icon: "../../../assets/gfx/icons/stack/css.svg" },
            { title: "JavaScript", icon: "../../../assets/gfx/icons/stack/js.svg" },
            { title: "webpack", icon: "../../../assets/gfx/icons/stack/webpack.svg" },
            { title: "React", icon: "../../../assets/gfx/icons/stack/react.svg" },
            { title: "Redux", icon: "../../../assets/gfx/icons/stack/redux.svg" },
            { title: "PixiJS", icon: "../../../assets/gfx/icons/stack/pixi.svg" },
            { title: "Node.js", icon: "../../../assets/gfx/icons/stack/nodejs.svg" }
        ];

        const discreteUse = [
            { title: "Handlebars", icon: "../../../assets/gfx/icons/stack/handlebars.svg" },
            { title: "Sass", icon: "../../../assets/gfx/icons/stack/sass.svg" },
            { title: "Bootstrap", icon: "../../../assets/gfx/icons/stack/bootstrap.svg" },
            { title: "TypeScript", icon: "../../../assets/gfx/icons/stack/ts.svg" },
            { title: "Angular", icon: "../../../assets/gfx/icons/stack/angular.svg" },
            { title: "Express", icon: "../../../assets/gfx/icons/stack/express.svg" },
            { title: "PHP", icon: "../../../assets/gfx/icons/stack/php.svg" },
            { title: "MySQL", icon: "../../../assets/gfx/icons/stack/mysql.svg" },
        ];

        const versionControlSystems = [
            { title: "Git", icon: "../../../assets/gfx/icons/stack/git.svg" }
        ];

        return { primaryStack, discreteUse, versionControlSystems };
    };

    /**
     * Method handling the alpha, alpha delay (this.stackIconsDelay) and translate transformation of all stack icons during the human shape animation.
     * The values are randomly generated so that all values are different on every animation iteration.
     * Always running.
     * Arrow function to keep the scope here.
     */
    handleStackIcons = () => {
        const { mainCanvas } = coreComponents;
        const { alpha, running } = mainCanvas.humanShapeAnimation;

        if (running) {
            const stackIcons = Array.from(this.component.querySelectorAll(".stackIcon"));
            const count = stackIcons.length;

            for (let i = 0; i < count; i++) {
                if (!this.stackIconsDelay) stackIcons[i].style.animationDuration = `${Math.random() * 2.8}s`;

                stackIcons[i].style.transform = `translate(${this.random(1 + Math.floor(alpha * 2.4))}px, ${this.random(1 + Math.floor(alpha * 2.4))}px)`
                
                if (i === (count - 1) && !this.stackIconsDelay) this.stackIconsDelay = true;
            };
        } else {
            if (this.stackIconsDelay) {
                const stackIcons = Array.from(this.component.querySelectorAll(".stackIcon"));

                for (let i = 0; i < stackIcons.length; i++) {
                    stackIcons[i].style.animationDuration = "0s";
                 };

                this.stackIconsDelay = false;
            };
        };
    };
};

export default MainPage;
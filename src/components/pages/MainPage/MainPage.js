import BaseComponent from "../../core/BaseComponent/BaseComponent";
import mainPageTemplate from "./mainPage.hbs";
import "./mainPage.scss";

import noiseFrames from "../../../assets/gfx/img/noise.png";

import { coreComponents } from "../../../utils/utils";

class MainPage extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("section");
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
        this.distortionCanvasOffsetY = 3;
        this.distortionCanvasAlpha = 0;

        this.iconsHoverEnabled = false;

        this.childSubComponents = [];

        this.generateImageSection();

        this.animationsLoop([
            this.handleImages,
            this.toggleIconSectionHover,
            this.handleDistortionCanvas
        ]);
    };

    setAge() {
		let age = Date.now() - new Date(1985, 4, 3).getTime();
		let ageDate = new Date(age);

		return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
	};

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

        this.childSubComponents.push(["imageContainer", skullImage]);
        this.childSubComponents.push(["imageContainer", mainImage]);
    };

    generateDistortionCanvas() {
        this.distortionCanvas = this.createElement("canvas", { id: "distortionCanvas" });
        this.distortionCanvasCtx = this.distortionCanvas.getContext("2d");
        this.childSubComponents.push(["imageContainer", this.distortionCanvas]);
        
        this.distortionCanvasImage.src = noiseFrames;
    };

    handleImages = () => {
        const mainImage = this.component.querySelector("#mainImage");
        const skullImage = this.component.querySelector("#skullImage");
        const { mainCanvas } = coreComponents;
        const { alpha, alphaMax, running } = mainCanvas.humanShapeAnimation;

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

    handleCanvasAnimation() {
        const { mainCanvas } = coreComponents;
        const { alpha, running } = mainCanvas.humanShapeAnimation;
        const frameWidth = 190;
        const frameHeight = 277;
        const frameX = (this.currentFrame * frameWidth) + this.currentFrame * 2;
        const frameY = (this.offsetY * frameHeight) + this.offsetY * 2;

        if (running) {
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

    toggleIconSectionHover = () => {
        const { scrollTop, offsetHeight } = document.querySelector("main");
        const scrollOffset = Math.floor(scrollTop) + offsetHeight;

        if (scrollOffset >= 735) {
            if (!this.iconsHoverEnabled) this.iconsHoverEnabled = true;
            console.log(Math.floor(scrollTop) + offsetHeight, window.innerHeight);
        } else {
            if (this.iconsHoverEnabled) this.iconsHoverEnabled = false;
        };
    };

    handleIconSectionHover() {

    };
};

export default MainPage;
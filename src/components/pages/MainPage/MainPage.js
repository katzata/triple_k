import BaseComponent from "../../core/BaseComponent/BaseComponent";
import mainPageTemplate from "./mainPage.hbs";
import "./mainPage.scss";

import { coreComponents } from "../../../utils/utils";
import DistortionCanvas from "./DistortionCanvas/DistortionCanvas";

class MainPage extends BaseComponent {
    constructor() {
        super();

        this.component = document.createElement("section");
        this.template = mainPageTemplate;
        this.templateData = () => {
            this.currentLang.mainPage.topArticle.age.content = `${this.setAge()}`;
            return this.currentLang.mainPage;
        };
        this.distortionCanvas = new DistortionCanvas();
        this.childSubComponents = [
            ["imageContainer", this.distortionCanvas.render()]
        ];

        this.generateImages();

        this.animationsLoop([
            this.handleImages
        ]);
    };

    setAge() {
		let age = Date.now() - new Date(1985, 4, 3).getTime();
		let ageDate = new Date(age);

		return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
	};

    generateImages() {
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

    handleImages = () => {
        const mainImage = this.component.querySelector("#mainImage");
        const skullImage = this.component.querySelector("#skullImage");
        const { mainCanvas } = coreComponents;
        const { alpha, alphaMax, running } = mainCanvas.humanShapeAnimation;
        
        if (running) {
            if (!this.distortionCanvas.isVisible) this.distortionCanvas.isVisible = true;
            this.distortionCanvas.animationRunning = true;
            this.distortionCanvas.alpha = alpha / 2;
        } else {
            if (this.distortionCanvas.animationRunning) this.distortionCanvas.animationRunning = false;
        };
        // console.log(alpha, alphaMax);
        if (alpha !== 0) {
            const random = Math.random();
            const posX = this.random(alpha * 5);
            const posY = 0/* this.random(3) + 3 */;
            const skewX = -random * (alpha * 6);
            const skewY = 0;
            const mainOpacity = random > .5 ? (random + .4) : (1 - (alpha - .2));
            const mainHue = this.random(0);

            mainImage.style.transform = `translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg)`;
            mainImage.style.filter = `hue-rotate(${mainHue}deg)`;
            mainImage.style.opacity = `${mainOpacity}`;
            
            skullImage.style.transform = `rotateZ(-4deg) translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg)`;
        } else {
            if (mainImage && mainImage.style.opacity !== "1") {
                mainImage.style.transform = `translate(0px, 0px) skew(0deg, 0deg)`;
                mainImage.style.filter = `hue-rotate(0deg)`;
                mainImage.style.opacity = "1";
                
                skullImage.style.transform = `rotateZ(-4deg) translate(0px, 0px) skew(0deg, 0deg)`;
            };
        };
    };

    generateIcons() {
        const icons = {
            HTML: "../assets/gfx/icons/html.svg",
            CSS: "../assets/gfx/icons/css.svg",
            JavaScript: "../assets/gfx/icons/js.svg",
            webpack: "../assets/gfx/icons/webpack.svg",
            React: "../assets/gfx/icons/react.svg",
            Redux: "../assets/gfx/icons/redux.svg",
            PixiJs: "../assets/gfx/icons/pixi.svg",


            Handlebars: "../assets/gfx/icons/handlebars.svg",
            Sass: "../assets/gfx/icons/sass.svg",
            Bootstrap: "../assets/gfx/icons/bootstrap.svg",
            TypeScript: "../assets/gfx/icons/ts.svg",
            jQuery: "../assets/gfx/icons/jquery.svg",
            Angular: "../assets/gfx/icons/angular.svg",
            Nodejs: "../assets/gfx/icons/nodejs.svg",
            Express: "../assets/gfx/icons/express.svg",
            php: "../assets/gfx/icons/php.svg",
            Laravel: "../assets/gfx/icons/laravel.svg",
            
            Git: "../assets/gfx/icons/git.svg"
        };

        const primaryStack = [
            "../assets/gfx/icons/html.svg",
            "../assets/gfx/icons/css.svg",
            "../assets/gfx/icons/sass.svg",
            "../assets/gfx/icons/bootstrap.svg",
            "../assets/gfx/icons/js.svg",
            "../assets/gfx/icons/ts.svg",
            "../assets/gfx/icons/react.svg",
            "../assets/gfx/icons/redux.svg",
            "../assets/gfx/icons/pixi.svg",
            "../assets/gfx/icons/webpack.svg",
            "../assets/gfx/icons/nodejs.svg",
            "../assets/gfx/icons/git.svg"
        ];

    };
};

export default MainPage;
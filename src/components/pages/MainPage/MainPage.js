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
            const stackIcons = Object.entries(this.generateIcons());
            
            for (const [section, icons] of stackIcons) {
                this.currentLang.mainPage.stackArticle.content[section].content = icons;
            };
            this.currentLang.mainPage.topArticle.age.content = `${this.setAge()}`;
            
            return { ...this.currentLang.mainPage, ...this.generateIcons() };
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
            if (!this.distortionCanvas.animationRunning) this.distortionCanvas.animationRunning = true;
            this.distortionCanvas.alpha = alpha / 2;
        } else {
            if (this.distortionCanvas.animationRunning) this.distortionCanvas.animationRunning = false;
        };

        if (mainImage && skullImage) {
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
    };

    generateIcons() {
        /* const icons = {
            HTML: "../assets/gfx/icons/html.svg",
            CSS: "../assets/gfx/icons/css.svg",
            JavaScript: "../assets/gfx/icons/js.svg",
            webpack: "../assets/gfx/icons/webpack.svg",
            React: "../assets/gfx/icons/react.svg",
            Redux: "../assets/gfx/icons/redux.svg",
            PixiJs: "../assets/gfx/icons/pixi.svg",
            Nodejs: "../assets/gfx/icons/nodejs.svg",

            Handlebars: "../assets/gfx/icons/handlebars.svg",
            Sass: "../assets/gfx/icons/sass.svg",
            Bootstrap: "../assets/gfx/icons/bootstrap.svg",
            TypeScript: "../assets/gfx/icons/ts.svg",
            jQuery: "../assets/gfx/icons/jquery.svg",
            Angular: "../assets/gfx/icons/angular.svg",
            Express: "../assets/gfx/icons/express.svg",
            php: "../assets/gfx/icons/php.svg",
            
            Git: "../assets/gfx/icons/git.svg"
        }; */

        const primaryStack = [
            {
                title: "HTML",
                icon: "../../../assets/gfx/icons/stack/html.svg"
            },
            {
                title: "CSS",
                icon: "../../../assets/gfx/icons/stack/css.svg"
            },
            {
                title: "JavaScript",
                icon: "../../../assets/gfx/icons/stack/js.svg"
            },
            {
                title: "webpack",
                icon: "../../../assets/gfx/icons/stack/webpack.svg"
            },
            {
                title: "React",
                icon: "../../../assets/gfx/icons/stack/react.svg"
            },
            {
                title: "Redux",
                icon: "../../../assets/gfx/icons/stack/redux.svg"
            },
            {
                title: "PixiJS",
                icon: "../../../assets/gfx/icons/stack/pixi.svg"
            },
            {
                title: "Node.js",
                icon: "../../../assets/gfx/icons/stack/nodejs.svg"
            }
        ];

        const discreteUse = [
            {
                title: "Handlebars",
                icon: "../../../assets/gfx/icons/stack/handlebars.svg"
            },
            {
                title: "Sass",
                icon: "../../../assets/gfx/icons/stack/sass.svg"
            },
            {
                title: "Bootstrap",
                icon: "../../../assets/gfx/icons/stack/bootstrap.svg"
            },
            {
                title: "TypeScript",
                icon: "../../../assets/gfx/icons/stack/ts.svg"
            },
            {
                title: "Angular",
                icon: "../../../assets/gfx/icons/stack/angular.svg"
            },
            {
                title: "Express",
                icon: "../../../assets/gfx/icons/stack/express.svg"
            },
            {
                title: "PHP",
                icon: "../../../assets/gfx/icons/stack/php.svg"
            },
            {
                title: "MySQL",
                icon: "../../../assets/gfx/icons/stack/mysql.svg"
            },
        ];

        const versionControlSystems = [
            {
                title: "Git",
                icon: "../../../assets/gfx/icons/stack/git.svg"
            }
        ];

        return { primaryStack, discreteUse, versionControlSystems };
    };
};

export default MainPage;
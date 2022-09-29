import BaseComponent from "../../core/BaseComponent/BaseComponent";
import mainPageTemplate from "./mainPage.hbs";
import "./mainPage.scss";

import DistortionCanvas from "./DistortionCanvas/DistortionCanvas";

class MainPage extends BaseComponent {
    constructor() {
        super();

        this.component = document.createElement("section");
        this.template = mainPageTemplate;
        this.templateData = () => { test: "this.currentLang.mainSection.test" };
        this.distortionCanvas = new DistortionCanvas();
        this.childSubComponents = [
            ["imageContainer", this.distortionCanvas.render()]
        ];

        this.generateImages();

        this.animationsLoop([
            this.handleImages
        ]);
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

        this.childSubComponents.push(["imageContainer", mainImage]);
        this.childSubComponents.push(["imageContainer", skullImage]);
    };

    handleImages = () => {
        if (this.distortionCanvas.animationAlpha === this.distortionCanvas.alphaMax) {
            const posX = this.random(2);
            const posY = this.random(3) + 3;
            const skewX = this.random(1) - 3;
            const skewY = 0;
            const mainOpacity = this.random() + .5;

            const mainImage = document.querySelector("#mainImage");
            const skullImage = document.querySelector("#skullImage");

            mainImage.style.transform = `translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg)`;
            mainImage.style.opacity = `${mainOpacity}`;

            skullImage.style.transform = `rotateZ(-4deg) translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg)`;
        }
    };
};

export default MainPage;
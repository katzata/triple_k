import BaseComponent from "../BaseComponent/BaseComponent";
import "./fogCanvas.scss";

import FogParticle from "./Fog/Fog";

class FogCanvas extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("canvas");
        this.component.id = "mainCanvas";
        this.scale = 1;
        this.component.width = window.innerWidth;
		this.component.height = window.innerHeight;

        this.ctx = this.component.getContext("2d");
        
        this.particleSize = this.setSize() * this.scale;
        this.fogDensity = this.setDensity()/* Math.ceil(this.component.height / (this.particleSize / 4)) */;
        this.fogVelocity = 4 * this.scale;
        this.fogParticles = [];

        this.prepareFog();
        this.animationsLoop([
            this.canvasHandler
        ]);
    };

    setSize() {
        const { innerWidth, innerHeight } = window;
        return innerWidth < innerHeight ? innerWidth / 1.4 : innerHeight / 1.4;
    };
    
    setDensity() {
        const { innerWidth, innerHeight } = window;
        const density = innerWidth > innerHeight ? innerWidth : innerHeight;
        return Math.floor(density / 10);
    };

    canvasHandler = () => {
        this.component.width = window.innerWidth * this.scale;
		this.component.height = window.innerHeight * this.scale;

        this.ctx.clearRect(0, 0, this.component.width, this.component.height);
        this.test(0, 0, this.component.width, this.component.height, "black");
        this.drawFog();
    };

    prepareFog() {
        const maxX = this.component.width - this.particleSize;
        const maxY = this.component.height - this.particleSize;

        for (let i = 0; i < this.fogDensity; i++) {
            const random = (num) => Math.ceil(Math.random() * num);
            
            const posX = random(maxX);
            const posY = random(maxY);
            const velocityX = Math.random() >= .5 ? this.fogVelocity : -this.fogVelocity;
            const velocityY = Math.random() >= .5 ? this.fogVelocity : -this.fogVelocity;

            const particle = new FogParticle({
                size: this.particleSize,
                alphaDelay: i % 2 !== 0 ? 10 : 0,
                x: posX,
                y: posY,
                maxX,
                maxY,
                velocityX: random(velocityX) + 1,
                velocityY: random(velocityY) + 1
            });

            this.fogParticles.push(particle);
        };
    };

    drawFog() {
        const count = this.fogParticles.length;
        
        for (let i = 0; i < count; i++) {
            this.fogParticles[i].render(this.ctx, i);
        };
    };

    drawImage(image, {sx, sy, sWidth, sHeight, x, y, width, height}, rotate = 0) {
        const simpleAttr = [x, y, width * this.scale, height * this.scale];
        const tileAttr = [sx, sy, sWidth, sHeight, x, y, width * this.scale, height * this.scale];
        const attr = sx && sy && sWidth && sHeight ? tileAttr : simpleAttr;

        if (rotate !== 0) {
            this.ctx.save();
            // this.ctx.translate(-150, -150);
            this.ctx.rotate(rotate * Math.PI / 180);
            // this.ctx.translate(-4400, -600);
        };
        // this.ctx.rotate(45 * Math.PI / 180);
        this.ctx.drawImage(image, ...attr);

        if (rotate !== 0) this.ctx.restore();
        // console.log(image, ...attr);
    };




    // FOR TESTING !!!
    ///////////////////////////////////////////

    test(x, y, width, height, color) {
        this.ctx.fillStyle = color ? color : 'green';
        this.ctx.fillRect(x, y, width, height);
    }

    ///////////////////////////////////////////




    render() {
        return this.component;
    };
};

export default FogCanvas;
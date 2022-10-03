const humanShape = new Image();
humanShape.src = "../../../../assets/gfx/img/human_shape.png";

class HumanShapeAnimation {
    constructor() {
        this.baseWidth = 256;
        this.baseHeight = 512;
        this.renderWidth = 256;
        this.renderHeight = 512;
        this.posX = 220;
        this.posY = 220;
        this.offsetX = 0;
        this.offsetY = 0;

        this.currentFrame = 0;
        this.delay = 2;
        this.delayFrame = 0;
        this.renderCoordsSet = false;
        
        this.running = false;
        this._fadeIn = false;
        this.alpha = 0;
        this.alphaMax = 0.7;
        this.alphaIncrement = 0.005;
        this.maxOpacityDuration = 40;
        this.maxOpacityDurationCounter = this.maxOpacityDuration;
        
        this.sequence = [
            [0, 0], // 1
            [512, 0], // 3
            [768, 0], // 4
            [256, 0], // 2
            [768, 0], // 4
            [512, 0], // 3
            [0, 0], // 1
        ];
    };

    setSize() {
        const divider = 5;
        const calcX = Math.floor((window.innerHeight / divider) / 2);
        const calcY = Math.floor(window.innerHeight / divider);

        if (this.renderWidth !== calcX) this.renderWidth = calcX;
        if (this.renderHeight !== calcY) this.renderHeight = calcY;
    };

    handleFrames() {
        if (this.delayFrame < this.delay) {
            this.delayFrame++
        } else {
            this.delayFrame = 0;
            this.currentFrame++;
        };

        if (this.currentFrame === 4) this.currentFrame = 0;
    };

    handleRenderPosition() {
        const random = (range, divide) => {
            if (divide) {
                return Math.floor((Math.random() * range) - (range / 2))
            } else {
                return Math.floor((Math.random() * range));
            };
        };

        if (!this.renderCoordsSet) {
            const { width, top, bottom } = document.querySelector("main").getBoundingClientRect();
            const rangeX = Math.floor(width) - this.renderWidth;
            const rangeY = (Math.floor(bottom) - top) - this.renderHeight;
            const { finalX, finalY } = this.handleIfObscured(random(rangeX), random(rangeY) + top, Math.floor(width));

            this.renderCoordsSet = true;
            this.posX = finalX;
            this.posY = finalY;
        };

        this.offsetX = random(2, true);
        this.offsetY = random(3, true);
    };

    handleIfObscured(initialX, initialY, mainWidth, mainHeight) {
        const { x, y, width, height } = document.querySelector("#imageContainer").getBoundingClientRect();
        const minX = x - this.renderWidth;
        const maxX = x + width;
        const minY = y - this.renderHeight;
        const maxY = y + height;

        const coords = {
            finalX: initialX,
            finalY: initialY
        };

        if (initialX >= minX && initialX <= maxX &&
            initialY >= minY && initialY <= maxY)
            {

            if (maxX + this.renderWidth > mainWidth) {
                coords.finalX = minX;
            } else {
                coords.finalX = maxX;
            };

            if (maxY + this.renderHeight < mainHeight) coords.finalY = maxY;
        };

        return coords;
    };

    handleFade() {
        if (this.running) {
            if (this.fadeIn && this.alpha < 1) {
                this.alpha += this.alphaIncrement;
                
                if (this.alpha > this.alphaMax) this.alpha = this.alphaMax;
                if (this.alpha === this.alphaMax) this.fadeIn = false;
            };

            if (this.alpha === this.alphaMax && this.maxOpacityDurationCounter > 0) this.maxOpacityDurationCounter--;
            
            if (this.maxOpacityDurationCounter === 0 && !this.fadeIn && this.alpha > 0) {
                this.alpha -= this.alphaIncrement;
                
                if (this.alpha < 0) this.alpha = 0;
                
                if (this.alpha === 0) {
                    this.running = false;
                    this.renderCoordsSet = false;
                };
            };
        };
    };

    draw(ctx) {
        const [frameX, frameY] = this.sequence[this.currentFrame];
        this.setSize();
        this.handleRenderPosition();
        this.handleFade();

        ctx.save();
        ctx.translate(this.offsetX, this.offsetY);
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
            humanShape,
            frameX,
            frameY,
            this.baseWidth,
            this.baseHeight,
            this.posX,
            this.posY,
            this.renderWidth,
            this.renderHeight
        );
        ctx.restore();

        this.handleFrames();
    };

    set fadeIn(state) {
        this._fadeIn = state;
    };
    
    get fadeIn() {
        return this._fadeIn;
    };
};

export default HumanShapeAnimation;
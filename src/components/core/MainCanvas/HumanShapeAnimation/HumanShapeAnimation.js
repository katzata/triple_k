const humanShape = new Image();
humanShape.src = "../../../../assets/gfx/img/human_shape.png";

/**
 * HumanShapeAnimation is a class that handles the human shape animation.
 */
class HumanShapeAnimation {
    /**
     * @param {Number} baseWidth The original image width.
     * @param {Number} baseHeight The original image height.
     * @param {Number} renderWidth The image render width on the canvas.
     * @param {Number} renderHeight The image render height on the canvas.
     * @param {Number} posX The x coordinates of the rendered image on the canvas.
     * @param {Number} posY The y coordinates of the rendered image on the canvas.
     * @param {Number} offsetX Additional offset to the x coordinate to create a trembling effect.
     * @param {Number} offsetY Additional offset to the y coordinate to create a trembling effect.
     * @param {Number} currentFrame The curent animation frame.
     * @param {Number} delay Animation delay (frames).
     * @param {Number} delayFrame A counter for the delay.
     * @param {Boolean} renderCoordsSet An indicator to wether the render coordinates have been set.
     * @param {Boolean} running A trigger toggling the running state.
     * @param {Boolean} _fadeIn A trigger toggling the fadeIn state.
     * @param {Number} alpha The animation alpha value.
     * @param {Number} alphaMax The maximum allowed alpha value.
     * @param {Number} alphaIncrement The amount that will be added or subtracted from the animation alpha value.
     * @param {Number} maxOpacityDuration The duration of the animation maximum alpha stage (before it starts to fade out).
     * @param {Number} maxOpacityDurationCounter The maximum alpha stage counter.
     * @param {Array} sequence The x and y coordinates of the frames on the tile set ordered to create a custom animation instead of just sliding throu all thi images.
     */
    constructor() {
        this.baseWidth = 256;
        this.baseHeight = 512;
        this.renderWidth = 256;
        this.renderHeight = 512;
        this.posX = 0;
        this.posY = 0;
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

    /**
     * Method handling the render size (width and height) of the human shape animation.
     */
    setSize() {
        const divider = 5;
        const calcX = Math.floor((window.innerHeight / divider) / 2);
        const calcY = Math.floor(window.innerHeight / divider);

        if (this.renderWidth !== calcX) this.renderWidth = calcX;
        if (this.renderHeight !== calcY) this.renderHeight = calcY;
    };

    /**
     * Method handling the frame sequence of the human shape animation.
     * Handles the currentFrame and delayFrame;
     */
    handleFrames() {
        if (this.delayFrame < this.delay) {
            this.delayFrame++
        } else {
            this.delayFrame = 0;
            this.currentFrame++;
        };

        if (this.currentFrame === 4) this.currentFrame = 0;
    };

    /**
     * Method handling the animation x and y coordinates and offsets on the canvas.
     * Runs the handleIfObscured method to move the render coordinates if the fall under the main image (my photo) on the main page.
     */
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

    /**
     * Method that changes te initially generated x and y coordinates if the animation is considered to be obscured (currently by my photo on the main page).
     * @param {Number} initialX The initially generated x coordinates.
     * @param {Number} initialY The initially generated y coordinates.
     * @param {Number} mainWidth The initial animation width.
     * @param {Number} mainHeight The initial animation height.
     * @returns Either the initially generated coordinates or newly generated coordinates so that the animation will not be obscured.
     */
    handleIfObscured(initialX, initialY, mainWidth, mainHeight) {
        const imageContainer = document.getElementById("imageContainer");
        
        if (imageContainer) {
            const { x, y, width, height } = imageContainer.getBoundingClientRect();
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
        } else {
            return { finalX: window.innerWidth / 4, finalY: window.innerHeight / 2 };
        };
    };

    /**
     * Method handling the fade in and out stages of the animation.
     * Keeps the alpha from going to absurd nubers when surpassing the maximum values.
     * Also unsets the render coordinates (this.renderCoordsSet).
     */
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

    /**
     * Method handling the drawing of the animation.
     * Runs this.setSize, this.handleRenderPosition, this.handleFade and this.handleFrames.
     * @param {CanvasRenderingContext2D} ctx The canvas context.
     */
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

    /**
     * Sets the fade in/out state.
     * @param {Boolean} state The current fade state.
     */
    set fadeIn(state) {
        this._fadeIn = state;
    };
    
    /**
     * Gets the fade in/out state.
     */
    get fadeIn() {
        return this._fadeIn;
    };
};

export default HumanShapeAnimation;
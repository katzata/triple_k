const halo = new Image();
halo.src = "../../../../assets/gfx/img/halo.png";

/**
 * HaloAnimation creates a new canvas animation.
 */
class HaloAnimation {
    /**
     * @param {Number} baseWidth The original image width.
     * @param {Number} baseHeight The original image height.
     * @param {Number} renderWidth The rendered image width.
     * @param {Number} renderHeight The rendered image height.
     * @param {Number} renderCoordsSet An indicator to wether the halo animation coordinates have been set.
     * @param {Number} posX The x coordinate of the rendered image on the canvas (MainCanvas).
     * @param {Number} posY The y coordinate of the rendered image on the canvas (MainCanvas).
     * @param {Boolean} running A trigger that toggles the running state of the halo animation.
     * @param {Number} rotation The amount of rotation of the halo animation.
     * @param {Number} rotationSpeed The speed of the halo animation rotation.
     * @param {Number} heightDivider Used for the calculation when the halo size is being determined.
     * @param {Number} alpha The halo animation alpha.
     * @param {Number} alphaMax The maximum allowed alpha value.
     * @param {Number} bigHaloScale The big halo scale divider.
     * @param {Boolean} bigHaloFlickering A trigger toggling the big haloflickering state.
     * @param {Number} bigHaloRotation The big halo rotation.
     * @param {Number} bigHaloFlickerDelay The big halo delay in between the flickering states.
     * @param {Boolean} bigHaloFlickerDelaySet Indicates wether the flicker delay has been set.
     */
    constructor() {
        this.baseWidth = 395;
        this.baseHeight = 395;
        this.renderWidth = 0;
        this.renderHeight = 0;
        this.renderCoordsSet = false;
        this.posX = 0;
        this.posY = 0;
        this.running = false;
        this.rotation = 0;
        this.rotationSpeed = 0.3;
        this.heightDivider = 3;
        this.alpha = 0;
        this.alphaMax = 0.8;
        this.bigHaloScale = 5;
        this.bigHaloFlickering = false;
        this.bigHaloFlickeringDuration = 0;
        this.bigHaloRotation = 0;
        this.bigHaloFlickerDelay = 0;
        this.bigHaloFlickerDelaySet = false;
    };

    /**
     * Method handling the render size of the small halo.
     * Calculations are done based  on the screen height.
     */
    setSize() {
        const calcX = Math.floor((window.innerHeight / this.heightDivider));
        const calcY = Math.floor(window.innerHeight / this.heightDivider);

        if (this.renderWidth !== calcX) this.renderWidth = calcX;
        if (this.renderHeight !== calcY) this.renderHeight = calcY;
    };

    /**
     * Method handling the big halo flicker delay and duration.
     * The values are set at random with a maximum of 60(frames).
     * Gets set every time the bigger halo flicker state ends and the halo animation is running.
     */
    setHaloFlickerDelay() {
        if (!this.bigHaloFlickerDelaySet && !this.bigHaloFlickering) {
            this.bigHaloFlickerDelaySet = true;
            this.bigHaloFlickerDelay = Math.floor(Math.random() * 60);
            this.bigHaloFlickeringDuration = Math.ceil(Math.random() * 60);
        };
    };

    /**
     * Method handling the halo animation x and y coordinates on the canvas.
     * The values are set at random so that the render position is always different.
     * Gets set every time just before the halo animation starts running.
     */
    handleRenderPosition() {
        const random = (range, divide) => {
            if (divide) {
                return Math.floor((Math.random() * range));
            } else {
                return Math.floor((Math.random() * range));
            };
        };

        if (!this.renderCoordsSet) {
            const { width, top, bottom } = document.querySelector("main").getBoundingClientRect();
            const rangeX = Math.floor(width);
            const rangeY = (Math.floor(bottom) + top) - this.renderHeight;
            
            this.renderCoordsSet = true;
            this.posX = random(rangeX);
            this.posY = random(rangeY);
        };
    };

    /**
     * Method handling the drawing of the big halo.
     * Runs the handleBigHaloFlickerDelay to set the delay if necessary.
     * Unsets the big halo flickering state when needed.
     * @param {CanvasRenderingContext2D} ctx The main canvas context.
     */
    handleBigHalo(ctx) {
        this.handleBigHaloFlickerDelay();

        if (this.bigHaloFlickering) {
            const scaled = this.renderWidth * this.bigHaloScale;
            const alphaStages = [0, 0.2];
            
            ctx.save();
            ctx.globalAlpha = alphaStages[Math.floor(Math.random() * alphaStages.length)];
            ctx.translate(this.posX, this.posY);
            ctx.rotate(Math.PI / 180 * (this.bigHaloRotation += this.rotationSpeed));
            ctx.translate(-this.posX, -this.posY);
            this.renderHalo(ctx, scaled);
            ctx.restore();
            
            this.bigHaloFlickeringDuration--
            
            if (this.bigHaloFlickeringDuration <= 0) {
                this.bigHaloFlickering = false;
                this.setSize();
                this.alpha = this.alphaMax;
            };
        };
    };

    /**
     * Method setting the big halo flicker delay.
     */
    handleBigHaloFlickerDelay() {
        if (this.bigHaloFlickerDelaySet) {
            this.bigHaloFlickerDelay--;

            if (this.bigHaloFlickerDelay <= 0) {
                this.bigHaloFlickerDelaySet = false;
                this.bigHaloFlickering = true;
            };
        };
    };

    /**
     * Method combining the rendering for both halos.
     * @param {CanvasRenderingContext2D} ctx The main canvas context.
     * @param {Number} size A sepcific size to be used when drawing the halo on the canvas.
     * @returns A draw image call on the canvas context.
     */
    renderHalo(ctx, size) {
        return ctx.drawImage(
            halo,
            0,
            0,
            this.baseWidth,
            this.baseHeight,
            this.posX - ((size ? size : this.renderWidth) / 2),
            this.posY - ((size ? size : this.renderHeight) / 2),
            size ? size : this.renderWidth,
            size ? size : this.renderHeight
        );
    };

    /**
     * Method handling the drawing and unsetting of the coordinates of both halos.
     * @param {CanvasRenderingContext2D} ctx The main canvas context.
     */
    draw(ctx) {
        if (this.running) {
            this.setSize();
            this.setHaloFlickerDelay();
            this.handleRenderPosition();

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.posX, this.posY);
            ctx.rotate(Math.PI / 180 * (this.rotation -= this.rotationSpeed));
            ctx.translate(-this.posX, -this.posY);
            ctx.filter = "grayscale(1)";
            this.renderHalo(ctx);
            ctx.restore();

            this.handleBigHalo(ctx);
        } else {
            if (this.renderCoordsSet) this.renderCoordsSet = false;
        };
    };
};

export default HaloAnimation;
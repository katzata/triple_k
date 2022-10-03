const haloRed = new Image();
haloRed.src = "../../../../assets/gfx/img/halo_red.png";

class HaloAnimation {
    constructor() {
        this.baseWidth = 395;
        this.baseHeight = 395;
        this.renderWidth = 0;
        this.renderHeight = 0;
        this.tileX = 0;
        this.posX = 0;
        this.posY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.running = false;
        this.rotation = 0;
        this.rotationSpeed = 0.3;
        this.heightDivider = 3;
        this._fadeIn = true;
        this.alpha = 0;
        this.alphaIncrement = 0.01;
        this.alphaMax = 0.8;
        this.colorFlickering = false;
        this.colorFlickeringAlpha = 0;
        this.colorFlickeringRotation = 0;
        this.colorFlickeringDuration = 0;
        this.colorFlickerDelay = 0;
        this.colorFlickerDelaySet = false;
        this.colorFlickerScale = 5;
    };

    setSize() {
        const calcX = Math.floor((window.innerHeight / this.heightDivider));
        const calcY = Math.floor(window.innerHeight / this.heightDivider);

        if (this.renderWidth !== calcX) this.renderWidth = calcX;
        if (this.renderHeight !== calcY) this.renderHeight = calcY;
    };

    setColorFlickerDelay() {
        if (!this.colorFlickerDelaySet && !this.colorFlickering) {
            this.colorFlickerDelaySet = true;
            this.colorFlickerDelay = Math.floor(Math.random() * 60);
            this.colorFlickeringDuration = Math.ceil(Math.random() * 60);
        };
    };

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

    handleColorFlicker(ctx, renderHalo) {
        if (this.colorFlickerDelaySet) {
            this.colorFlickerDelay--;

            if (this.colorFlickerDelay <= 0) {
                this.colorFlickerDelaySet = false;
                this.colorFlickering = true;
            };
        };

        if (this.colorFlickering) {
            const scaled = this.renderWidth * this.colorFlickerScale;
            const alphaStages = [0, 0.2];
            
            ctx.save();
            ctx.globalAlpha = alphaStages[Math.floor(Math.random() * alphaStages.length)];
            ctx.translate(this.posX, this.posY);
            ctx.rotate(Math.PI / 180 * (this.colorFlickeringRotation += this.rotationSpeed));
            ctx.translate(-this.posX, -this.posY);
            renderHalo(scaled);
            ctx.restore();
            
            this.colorFlickeringDuration--
            
            if (this.colorFlickeringDuration <= 0) {
                this.colorFlickering = false;
                this.setSize();
                this.alpha = this.alphaMax;
            };
        };
    };

    draw(ctx) {
        if (this.running) {
            const renderHalo = (size) => ctx.drawImage(
                haloRed,
                this.tileX,
                0,
                this.baseWidth,
                this.baseHeight,
                this.posX - ((size ? size : this.renderWidth) / 2),
                this.posY - ((size ? size : this.renderHeight) / 2),
                size ? size : this.renderWidth,
                size ? size : this.renderHeight
            );

            this.setSize();
            this.setColorFlickerDelay();
            this.handleRenderPosition();

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.posX, this.posY);
            ctx.rotate(Math.PI / 180 * (this.rotation -= this.rotationSpeed));
            ctx.translate(-this.posX, -this.posY);
            ctx.filter = "grayscale(1)";
            renderHalo();
            ctx.restore();

            this.handleColorFlicker(ctx, renderHalo);
        } else {
            if (this.renderCoordsSet) this.renderCoordsSet = false;
        };
    };

    set fadeIn(state) {
        this._fadeIn = state;
    };
    
    get fadeIn() {
        return this._fadeIn;
    };
};

export default HaloAnimation;
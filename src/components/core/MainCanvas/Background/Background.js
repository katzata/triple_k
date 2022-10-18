/**
 * Background creates a new CanvasRenderingContext2D element.
 * @class
 */
class Background {
    /**
     * @param {Number} alpha The background alpha.
     * @param {Number} width The background original width.
     * @param {Number} height The background original height.
     * @param {HTMLImageElement} bg The background image.
     */
    constructor() {
        this.alpha = 0;
        this.width = 966;
        this.height = 563;
        this.bg = new Image();
        this.bg.src = "../../../../../assets/gfx/img/canvas_bg.png";
    };

    /**
     * Method handling the width, height, x and y coordinates, translate transformation and drawing of the background.
     * The background size is constantly calculated in order to keep the aspect ratio of the image and to make sure it always fills the screen and that is centered.
     * the calculations are based on the screen and original image sizes.
     * The context which will be used is passed down from the parent so that the FogParticle class doesn't nedd to cnow anything about the canvas that its drwing on.
	 * @param {CanvasRenderingContext2D} ctx The main canvas context (MainCanvas).
     */
    draw(ctx) {
        const { innerWidth, innerHeight } = window;
        const screenCalc = innerWidth / innerHeight;
        const widthCalc = innerHeight * (this.width / this.height);
        const heightCalc = innerWidth * (this.height / this.width);
        const posX = innerWidth / 2;
        const posY = innerHeight / 2;
        const translate = screenCalc >= 1.71 ? [-(innerWidth / 2), -(heightCalc / 2)] : [-(widthCalc / 2), -(innerHeight / 2)];
        
        ctx.save();
        ctx.translate(...translate);
        ctx.globalAlpha = this.alpha / 2.4;
        ctx.drawImage(
            this.bg,
            0,
            0,
            this.width,
            this.height,
            posX,
            posY,
            screenCalc >= 1.71 ? innerWidth : widthCalc,
            screenCalc < 1.71 ? innerHeight : heightCalc
        );

        ctx.restore();
    };
};

export default Background;
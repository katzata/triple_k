const bg = new Image();
bg.src = "../../../../../assets/gfx/img/canvas_bg.png";

class Background {
    constructor() {
        this.alpha = 0;
        this.width = 966;
        this.height = 563;
    };

    draw(ctx) {
        const { innerWidth, innerHeight } = window;
        const screenCalc = innerWidth / innerHeight;
        const widthCalc = innerHeight * (this.width / this.height);
        const heightCalc = innerWidth * (this.height / this.width);
        const posX = innerWidth / 2;
        const posY = innerHeight / 2;
        const translate = screenCalc >= 1.48 ? [-(innerWidth / 2), -(heightCalc / 2)] : [-(widthCalc / 2), -(innerHeight / 2)];
        
        ctx.save();
        ctx.translate(...translate);
        ctx.globalAlpha = this.alpha / 2.4;
        ctx.drawImage(
            bg,
            0,
            0,
            this.width,
            this.height,
            posX,
            posY,
            screenCalc >= 1.48 ? innerWidth : widthCalc,
            screenCalc < 1.48 ? innerHeight : heightCalc
        );

        ctx.restore();
    };
};

export default Background;
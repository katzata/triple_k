class BloodTrails {
    constructor() {
        this._running = false;
        this.amount = 0;
        this._alpha = 0;
        this.initialY = [];
        this.posX = [];
        this.posY = [];
        this.velocities = [];
        this.widths = [];
        this.amountSet = false;
    };

    handleAmount() {
        const amount = window.innerWidth / 50;
        const random = (num) => Math.round(Math.random() * num);

        for (let i = 0; i < amount; i++) {
            this.widths.push(random(8) + 1)
            this.initialY.push(0);
            this.posX.push(random(window.innerWidth));
            this.posY.push(0);

            const velocityCalc = random(4) + random(4);
            const velocity = (velocityCalc !== this.velocities[i - 1]) || (velocityCalc !== this.velocities[i + 1]) ? velocityCalc : velocityCalc - random(3);
            
            this.velocities.push(velocity);
        };
    };

    reset() {
        this.amount = 0;
        this.initialY = [];
        this.posX = [];
        this.posY = [];
        this.velocities = [];
        this.widths = [];
        this.amountSet = false;
    };

    draw(ctx) {
        const amount = window.innerWidth / 20;
        if (!this.amountSet) {
            this.amountSet = true;
            this.handleAmount();
        };

        for (let i = 0; i < amount; i++) {
            ctx.save(); //
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.lineWidth = this.widths[i];
            ctx.lineCap = "round";
            ctx.moveTo(this.posX[i], this.initialY[i]);
            ctx.lineTo(this.posX[i], this.posY[i]);
            ctx.strokeStyle = "rgba(255, 0, 0, .25)";
            ctx.stroke();
            ctx.restore(); //

            if (this.posY[i] < window.innerHeight) this.posY[i] += this.velocities[i];
        };
    };

    set running(state) {
        this._running = state;
        if (state === false) this.reset();
    };

    get running() {
        return this._running;
    };

    set alpha(state) {
        this._alpha = state;
    };

    get alpha() {
        return this._alpha;
    };
};

export default BloodTrails;
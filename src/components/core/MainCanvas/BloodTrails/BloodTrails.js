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
        this.maxWidth = 12;
        this.amountSet = false;
    };

    handleAmount() {
        const amount = Math.floor(window.innerWidth / 90);
        const random = (num) => Math.round(Math.random() * num);

        for (let i = 0; i < amount; i++) {
            this.widths.push(random(this.maxWidth) + 1)
            this.initialY.push(0);
            this.posX.push(random(window.innerWidth));
            this.posY.push(0);

            const velocityCalc = random(2) + random(3);
            const velocity = (velocityCalc !== this.velocities[i - 1]) || (velocityCalc !== this.velocities[i + 1]) ? velocityCalc : velocityCalc - random(3);

            this.velocities.push(velocity);
        };
    };

    handleMovement(index) {
        if (this.alpha >= 0.25 && this.posY[index] < window.innerHeight) this.posY[index] += this.velocities[index];
    };

    draw(ctx) {
        const amount = window.innerWidth / 20;
        if (!this.amountSet) {
            this.amountSet = true;
            this.handleAmount();
        };

        for (let i = 0; i < amount; i++) {
            this.handleMovement(i);

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.lineWidth = this.widths[i];
            ctx.lineCap = "round";
            ctx.moveTo(this.posX[i], this.initialY[i]);
            ctx.lineTo(this.posX[i], this.posY[i]);
            ctx.strokeStyle = "rgba(255, 0, 0, .25)";
            ctx.stroke();
            ctx.restore();
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
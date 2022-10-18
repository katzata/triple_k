/**
 * BloodTrails creates blood trails on the MainCanvas.
 * @class
 */
class BloodTrails {
    /**
     * @param {Boolean} _running A toggle that indicates if the blood trails should be runing.
     * @param {Number} amount The number of blood trails that will flow down the screen.
     * @param {Number} _alpha The alpha of ALL the generated blood trails.
     * @param {Array} initialY The initial Y coordinate of each blood trail (should be 0).
     * @param {Array} posX The x coordinates of each blood trail.
     * @param {Array} posY The y coordinates of each blood trail.
     * @param {Array} velocities The individual blood trail flow speed.
     * @param {Array} widths The individual width of each blood trail.
     * @param {Number} maxWidth The maximum allowed widthj a blood trail can have.
     * @param {Boolean} prepped Indicates if the number of blood trails is preppared.
     */
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
        this.prepped = false;
    };

    /**
     * Method handling the preparation of the initial values for all blood trails.
     * Sets the amount, widths, x and y coordinates and velocities.
     * All values (except the initial y coordinates) are randomly generated.
     */
    prepareTrails() {
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

    /**
     * Method handling the movement of each individual blood trail.
     * @param {Number} index Indicates the current blood trail that hase to be moved;
     */
    handleMovement(index) {
        if (this.alpha >= 0.25 && this.posY[index] < window.innerHeight) this.posY[index] += this.velocities[index];
    };

    /**
     * Method handling the preparation and drawing of the blood particles on the MainCanvas.
     * The preparation phase runs once before each animation start. Thus ensuring the the blood trails will be placed at random every time.
     * The context which will be used is passed down from the parent so that the FogParticle class doesn't nedd to cnow anything about the canvas that its drwing on.
	 * @param {CanvasRenderingContext2D} ctx The main canvas context (MainCanvas).
     */
    draw(ctx) {
        const amount = window.innerWidth / 20;
        if (!this.prepped) {
            this.prepped = true;
            this.prepareTrails();
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

    /**
     * Method handling the re-initialisation of the blood trails animation values.
     */
    reset() {
        this.amount = 0;
        this.initialY = [];
        this.posX = [];
        this.posY = [];
        this.velocities = [];
        this.widths = [];
        this.prepped = false;
    };

    /**
     * Set the animation running state.
     * @param {Boolean} state The current animation running state.
     */
    set running(state) {
        this._running = state;
        if (state === false) this.reset();
    };

    /**
     * Get the animation running state.
     */
    get running() {
        return this._running;
    };

    /**
     * Set alpha value.
     * @param {Number} value The current animation alpha.
     */
    set alpha(value) {
        this._alpha = value;
    };

    /**
     * Get the animation alpha.
     */
    get alpha() {
        return this._alpha;
    };
};

export default BloodTrails;
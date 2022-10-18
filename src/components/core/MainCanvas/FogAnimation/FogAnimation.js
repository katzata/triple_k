import FogParticle from "./FogParticle";
/**
 * A class that handles the fog animation values using fogParticles.
 * @see FogParticle
 */
class FogAnimation {
    /**
     * @param {Boolean} _fadeIn Toggles the particle (affects all particles) fade in and fade out phases.
     * @param {Number} particleSize The single fog paticle size.
     * @param {Number} density The number of fog particles that will be drawn on the screen.
     * @param {Number} velocity The maximum speed at which the particles will be moving.
     * @param {Array} particles An array (initially empty) that will contain all particles that will be drawn to the screen.
     * @param {Boolean} prepped Toggles the prepared state before the animation starts and after it finishes.
     * @param {Boolean} _allParticlesVisible Marks if all the particles that are drawn to the screen have an alpha of 1, thus being all visible.
     * @param {Number} triggerParticle Marks a specific particle to be used as a trigger by other components (in this case the parent component "MainCanvas").
     */
    constructor() {
        this._fadeIn = false;
        this.particleSize = 0;
        this.density = 0;
        this.velocity = 5;
        this.particles = [];
        this.prepped = false;
        this._allParticlesVisible = false;
        this.triggerParticle = 0;
    };

    /**
     * Sets the single particle size (this.particleSize) based on screen size calculations.
     */
    setSize() {
        this.particleSize = (innerWidth < innerHeight ? innerWidth : innerHeight) / 1.65;
    };

    /**
     * Sets the number of particles (this.density) to be drawn on the screen based on screen size calculations, with a set minimum of 115 particles.
     */
    setDensity() {
        const { innerWidth, innerHeight } = window;
        const density = Math.ceil((innerWidth > innerHeight ? innerWidth : innerHeight) / 6);
        this.density = density < 115 ? 115 : density;
    };

    /**
     * Sets the trigger particle (this.triggerParticle).
     * Currently at a fixed value
     */
    setTriggerParticle() {
        this.triggerParticle = 1/* Math.floor(this.density / 16) */;
    };

    /**
     * Method handling the size, density, velocity, initial coords, trigger particle and the fog particles themselves. This way if a screen resize has occured the afore mentioned values will be adjusted accourdingly.
     * The values are based on the screen size.
     * Runs once before every animation start.
     */
    prepareFog() {
        this.setSize();
        this.setDensity();
        this.setTriggerParticle();

        const { innerWidth, innerHeight } = window;
        const maxX = innerWidth - this.particleSize;
        const maxY = innerHeight - this.particleSize;

        for (let i = 0; i < this.density; i++) {
            const random = (num) => Math.floor(Math.random() * num);
            
            const posX = random(maxX);
            const posY = random(maxY);
            const velocityX = Math.random() >= .5 ? this.velocity : -this.velocity;
            const velocityY = Math.random() >= .5 ? this.velocity : -this.velocity;

            const particle = new FogParticle({
                size: this.particleSize,
                alphaDelay: Math.ceil(i / 8),
                x: posX,
                y: posY,
                maxX,
                maxY,
                velocityX: random(velocityX) + 1,
                velocityY: random(velocityY) + 1
            });

            this.particles.push(particle);
        };

        this.prepped = true;
    };

    /**
     * Method handling the this.allParticlesVisible state.
     */
    checkLastParticle() {
        const lastParticle = this.particles[this.density - 1];

        if (lastParticle && lastParticle.alpha === 1 && lastParticle.fadeIn) {
            if (!this.allParticlesVisible) this.allParticlesVisible = true;
        };

        if (lastParticle && lastParticle.alpha === 0 && !lastParticle.fadeIn) {
            if (this.allParticlesVisible) this.allParticlesVisible = false;
        };
    };

    /**
     * Method handling the preparation, drawing of all the fog particles needed for the animation.
     * Also triggers a callback to wrap up the animation.
     * @param {CanvasRenderingContext2D} ctx The MainCanvas context. By pasing the context from outside the animation does not need to know anything about the canvas it's running on.
     * @param {Boolean} siblingsReady An external indicator for when the MainCanvas siblings have been re-appended back to the dom with the new language texts.
     * @param {CallableFunction} siblingsHandler A callback originating from the parent component (MainCanvas) used to trigger fade outs, fade ins and the replacement of the HTML content.
     * @see MainCanvas.handleSiblings
     */
    draw(ctx, siblingsReady, siblingsHandler) {
        if (this.fadeIn && !this.prepped) this.prepareFog();
        this.checkLastParticle();

        const fadeOutTriggerParticle = this.particles[this.triggerParticle];
        const fogFadeInTriggerParticle = this.particles[this.triggerParticle];

        for (let i = 0; i < this.density; i++) {
            if (this.allParticlesVisible && siblingsReady) {
                if (this.particles[i].fadeIn) this.particles[i].fadeIn = false;
            };
            
            this.particles[i].draw(ctx);
        };
        
        if (this.fadeIn) siblingsHandler(fadeOutTriggerParticle, fogFadeInTriggerParticle);
    };
    
    /**
     * Method handling the re-initialisation of all the fog animation values.
     */
    reset() {
        this.fadeIn = false;
        this.prepped = false;
        this.particles = [];
        this.density = 0;
        this.allParticlesVisible = false;
    };


    /**
     * Sets the _fadeIn state.
     */
    set fadeIn(state) {
        this._fadeIn = state;
    };

    /**
     * Gets the _fadeIn state.
     */
    get fadeIn() {
        return this._fadeIn;
    };

    /**
     * Sets the _allParticlesVisible state.
     */
    set allParticlesVisible(state) {
        this._allParticlesVisible = state;
    };

    /**
     * Gets the _allParticlesVisible state.
     */
    get allParticlesVisible() {
        return this._allParticlesVisible;
    };
};

export default FogAnimation;
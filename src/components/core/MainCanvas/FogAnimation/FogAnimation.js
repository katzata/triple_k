import FogParticle from "./FogParticle";

class FogAnimation {
    constructor() {
        const { innerWidth, innerHeight } = window;

        this._fadeIn = false;
        this.particleSize = 0;
        this.density = 0;
        this.velocity = 6;
        this.particles = [];
        this.prepped = false;
        this._allParticlesVisible = false;
        this.triggerParticle = 0;
    };

    setSize() {
        this.particleSize = (innerWidth < innerHeight ? innerWidth : innerHeight) / 1.65;
    };

    setDensity() {
        const { innerWidth, innerHeight } = window;
        const density = Math.ceil((innerWidth > innerHeight ? innerWidth : innerHeight) / 6);
        this.density = density < 100 ? 100 : density;
    };

    setTriggerParticle() {
        this.triggerParticle = 1/* Math.floor(this.density / 16) */;
    };

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

    checkLastParticle() {
        const lastParticle = this.particles[this.density - 1];

        if (lastParticle && lastParticle.alpha === 1 && lastParticle.fadeIn) {
            if (!this.allParticlesVisible) this.allParticlesVisible = true;
        };

        if (lastParticle && lastParticle.alpha === 0 && !lastParticle.fadeIn) {
            if (this.allParticlesVisible) this.allParticlesVisible = false;
        };
    };

    draw(ctx, siblingsReady, siblingsHandler) {
        if (this.fadeIn && !this.prepped) this.prepareFog();
        this.checkLastParticle();

        const fadeOutTriggerParticle = this.particles[this.triggerParticle];
        const fogFadeInTriggerParticle = this.particles[this.triggerParticle];

        for (let i = 0; i < this.density; i++) {
            if (this.allParticlesVisible && siblingsReady) {
                if (this.particles[i].fadeIn) this.particles[i].fadeIn = false;
            };
            
            this.particles[i].render(ctx);
        };
        
        if (this.fadeIn) siblingsHandler(fadeOutTriggerParticle, fogFadeInTriggerParticle);
    };
    
    reset() {
        this.fadeIn = false;
        this.prepped = false;
        this.particles = [];
        this.density = 0;
        this.allParticlesVisible = false;
    };

    set fadeIn(state) {
        this._fadeIn = state;
    };

    get fadeIn() {
        return this._fadeIn;
    };

    set allParticlesVisible(state) {
        this._allParticlesVisible = state;
    };

    get allParticlesVisible() {
        return this._allParticlesVisible;
    };
};

export default FogAnimation;
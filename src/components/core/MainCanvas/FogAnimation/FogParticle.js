const fog = new Image();
fog.src = "../../../../assets/gfx/img/fog.png";
/**
 * FogParticle creates a new fog particle from an image.
 * @class
 */ 
class FogParticle {
	/**
	 * @param {Object} initialValues An object containig the initial values for the current fog particle.
	 * @constructor
	 * @param {HTMLImageElement} image An image of the fog particle.
	 * @param {Number} size The size of the fog particle.
	 * @param {Boolean} fadeIn A toggle handling the particle alpha and wether it should be increased or decreased.
	 * @param {Number} alpha The alpha for the current fog partile (floating point number with a max of 1).
	 * @param {Number} alphaIncrement The value that will be added or subtracted to the alpha (floating point number).
	 * @param {Number} alphaDelay A delay (represented in frames) slowing each individual fog particle. This way the particles fade in and out one after the other instead of at the same time.
	 * @param {Number} delayCount A counter to handle the delay.
	 * @param {Number} x The initial x coordinate on the fog particle on the canvas (MainCanvas).
	 * @param {Number} y The initial y coordinate on the fog particle on the canvas (MainCanvas).
	 * @param {Number} particleCutoff A percentage of the image that is allowed to leave the screen.
	 * @param {Number} minX The minimum allowed x coordinate of the fog particle on the canvas (MainCanvas).
	 * @param {Number} minY The minimum allowed y coordinate of the fog particle on the canvas (MainCanvas).
	 * @param {Number} maxX The maximum allowed x coordinate of the fog particle on the canvas (MainCanvas).
	 * @param {Number} maxY The maximum allowed y coordinate of the fog particle on the canvas (MainCanvas).
	 * @param {Number} velocityX The velocity at which the current fog particle will be moving.
	 * @param {Number} velocityY The velocity at which the current fog particle will be moving.
	 */
	constructor({ size, alphaDelay, x, y, maxX, maxY, velocityX, velocityY }) {
		this.image = fog;
		this.size = size;
		this.fadeIn = true;
		this.alpha = 0;
		this.alphaIncrement = 0.05;
		this.alphaDelay = alphaDelay;
		this.delayCount = 0;
		this.x = x;
		this.y = y;
		this.particleCutoff = .2;
		this.minX = -Math.ceil(size * this.particleCutoff);
		this.minY = -Math.ceil(size * this.particleCutoff);
		this.maxX = maxX + Math.floor(size * this.particleCutoff);
		this.maxY = maxY + Math.floor(size * this.particleCutoff);
		this.velocityX = velocityX;
		this.velocityY = velocityY;
	};

	/**
	 * Method handling the minimum and maximum allowed x and y coordinates.
	 */
	handleLimits() {
		this.minX = -Math.floor(this.size * this.particleCutoff);
		this.minY = -Math.floor(this.size * this.particleCutoff);
		this.maxX = window.innerWidth - (this.size - Math.ceil(this.size * this.particleCutoff));
		this.maxY = window.innerHeight - (this.size - Math.ceil(this.size * this.particleCutoff));
	};

	/**
	 * Method handling the x and y coordinates of the current particle on the canvas.
	 * When a minimum or maximum is reached the velocity x and y values get inverted.
	 */
	handleMovement() {
		this.x += this.velocityX;
		this.y += this.velocityY;

		if (this.x >= this.maxX) {
			this.velocityX = -this.velocityX;
			this.x = this.maxX;
		} else if (this.x <= this.minX) {
			this.velocityX = -this.velocityX;
		};

		if (this.y >= this.maxY) {
			this.velocityY = -this.velocityY;
			this.y = this.maxY;
		} else if (this.y <= this.minY) {
			this.velocityY = -this.velocityY;
		};
	};

	/**
	 * Method handling the increase or deacrease of the current particle's alpha.
	 * Based on the fade in toggle (this.fadeIn).
	 */
	handleAlpha() {
		if (this.fadeIn) {
			if (this.alphaDelay > this.delayCount) this.delayCount++;

			if (this.alphaDelay === this.delayCount && this.alpha < 1) {
				this.alpha += this.alphaIncrement;
				if (this.alpha + this.alphaIncrement > 1) this.alpha = 1;
			};
		} else {
			if (this.delayCount > 0) this.delayCount--;
			
			if (this.delayCount === 0 && this.alpha > 0) {
				this.alpha -= this.alphaIncrement;
				if (this.alpha < 0) this.alpha = 0;
			};
		};
	};

	/**
	 * Method handling the coordinate limits, movement, alpha and drawing of the current fog particle.
	 * The context which will be used is passed down from the parent so that the FogParticle class doesn't nedd to cnow anything about the canvas that its drwing on.
	 * @param {CanvasRenderingContext2D} ctx The main canvas context (MainCanvas).
	 * @returns Nothing if there is no image (early exit);
	 */
	draw(ctx) {
		if (!this.image) return;

		this.handleLimits();
		this.handleMovement();
		this.handleAlpha();

		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.image, this.x, this.y,this.size, this.size);
		ctx.restore();
	};
};

export default FogParticle;
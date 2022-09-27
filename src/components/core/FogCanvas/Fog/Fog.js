const fog = new Image();
fog.src = "../../../../assets/gfx/img/fog1.png";

class FogParticle {
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
		this.particleCutoff = .1;
		this.minX = -Math.ceil(size * this.particleCutoff);
		this.minY = -Math.ceil(size * this.particleCutoff);
		this.maxX = maxX + Math.floor(size * this.particleCutoff);
		this.maxY = maxY + Math.floor(size * this.particleCutoff);
		this.velocityX = velocityX;
		this.velocityY = velocityY;
	};

	handleDimentions() {
		this.minX = -Math.floor(this.size * this.particleCutoff);
		this.minY = -Math.floor(this.size * this.particleCutoff);
		this.maxX = window.innerWidth - (this.size - Math.ceil(this.size * this.particleCutoff));
		this.maxY = window.innerHeight - (this.size - Math.ceil(this.size * this.particleCutoff));
	};

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
				if (this.alpha - this.alphaIncrement < 0) this.alpha = 0;
			};
		};
	};

	render(ctx) {
		if (!this.image) return;

		this.handleDimentions();
		this.handleMovement();
		this.handleAlpha();

		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.image, this.x, this.y,this.size, this.size);
		ctx.restore();
	};
};

export default FogParticle;
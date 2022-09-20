const fog = new Image();
fog.src = "../../../../assets/gfx/img/fog1.png";

class FogParticle {
	constructor({ size, alphaDelay, x, y, maxX, maxY, velocityX, velocityY }) {
		this.image = fog;
		this.size = size;
		this.alpha = 0;
		this.alphaDelay = alphaDelay;
		this.x = x;
		this.y = y;
		this.minX = -Math.floor(size * .05);
		this.minY = -Math.floor(size * .05);
		this.maxX = maxX + Math.ceil(size * .05);
		this.maxY = maxY + Math.ceil(size * .05);
		this.velocityX = velocityX;
		this.velocityY = velocityY;
	};

	handleDimentions() {
		this.minX = -Math.floor(this.size * .07);
		this.minY = -Math.floor(this.size * .07);
		this.maxX = window.innerWidth - (this.size - Math.ceil(this.size * .07));
		this.maxY = window.innerHeight - (this.size - Math.ceil(this.size * .07));
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
		if (this.alphaDelay > 0) this.alphaDelay--;

		if (this.alphaDelay === 0 && this.alpha < 1) {
			this.alpha += 0.01;
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

// class Fog {
// 	constructor({ canvas, ctx, density, velocity, particle }) {
// 		this.canvas = canvas;
// 		this.ctx = ctx;
// 		this.canvasWidth = window.innerWidth;
// 		this.canvasHeight = window.innerHeight - window.innerHeight * .19;

// 		this.running = false;
// 		this.positionSet = false;
// 		this.density = density;
// 		this.alphaIncrement = .01;
// 		this.rendered = 0;
// 		this.renderCount = 0;
// 		this.fadingIn = true;
// 		this.fadeInDelay = 1;
// 		this.mavelocityX = velocity;
// 		this.particle = particle;
// 		this.particleSizeDivider = 2.1;

// 		this.createParticles();
// 		this.setImage();
// 	};

// 	createParticles() {
// 		this.particles = [];
// 		this.particlesAlpha = [];

// 		const random = (min, max) => Math.random() * (max - min) + min;

// 		for (let i = 0; i < this.density; i++) {
// 			const particle = new FogParticle(this.ctx, this.canvasWidth, this.canvasHeight);

// 			particle.setPosition(
// 				random(0, this.canvasWidth),
// 				random(0, this.canvasHeight)
// 			);
// 			particle.setVelocity(
// 				random(-this.mavelocityX, this.mavelocityX),
// 				random(-this.mavelocityX, this.mavelocityX)
// 			);

// 			this.particles.push(particle);
// 			this.particlesAlpha.push(0);
// 		};
// 	};

// 	handleDimentions() {
// 		// const canvas = document.querySelector(".fogCanvas");
// 		this.canvasWidth = this.canvas.width = window.innerWidth;
// 		this.canvasHeight = this.canvas.height = document.querySelector("main").offsetHeight;
// 	};

// 	setImage() {
// 		if (!this.particle) return;

// 		const img = new Image();
// 		img.onload = () => this.particles.forEach(particle => particle.setImage(img))
// 		img.src = this.particle;
// 	};

// 	fadeIn() {
// 		if (this.rendered < this.particlesAlpha.length) this.renderCount++;

// 		if (this.renderCount === this.fadeInDelay) {
// 			this.renderCount = 0;
// 			if (this.rendered < this.particlesAlpha.length) this.rendered += 1;
// 		};

// 		for (let i = 0; i < this.particlesAlpha.length; i++) {
// 			if (i <= this.rendered) {
// 				if (this.particlesAlpha[i] < 1) {
// 					this.particlesAlpha[i] += this.alphaIncrement;
// 				};
// 			};
// 		};

// 		// if (this.particlesAlpha[this.particlesAlpha.length - 1] >= 1) {
// 			// this.fadingIn = false;
// 		// }
// 	};

// 	fadeOut = () => {
// 		if (this.rendered > 0) this.renderCount++;

// 		if (this.renderCount === this.fadeInDelay) {
// 			this.renderCount = 0;
// 			if (this.rendered > 0) this.rendered -= 1;
// 		}

// 		for (let i = 0; i < this.particlesAlpha.length; i++) {
// 			if (i >= this.rendered) {
// 				if (this.particlesAlpha[i] > 0) {
// 					this.particlesAlpha[i] -= this.alphaIncrement;
// 				};
// 			};
// 		};

// 		if (this.particlesAlpha[0] <= 0 && this.rendered === 0) {
// 			this.resetValues();
// 		};
// 	};

// 	resetValues() {
// 		this.fadingIn = true;
// 		this.running = false;
// 		this.positionSet = false;
// 		this.canvas.style.zIndex = "-10";

// 		for (let i = 0; i < this.particlesAlpha.length; i++) {
// 			this.particlesAlpha[i] = 0;
// 		};
// 	};

// 	setPosition = () => {
// 		const random = (min, max) => Math.random() * (max - min) + min;

// 		for (let i = 0; i < this.particles.length; i++) {
// 			this.particles[i].setPosition(
// 				random(0, this.canvasWidth),
// 				random(0, this.canvasHeight)
// 			);
// 			this.particles[i].setVelocity(
// 				random(-this.mavelocityX, this.mavelocityX),
// 				random(-this.mavelocityX, this.mavelocityX)
// 			);
// 		};
// 	};

// 	render = (toggle) => {
// 		this.handleDimentions();

// 		if (!this.positionSet) {
// 			this.positionSet = true;
// 			this.setPosition();
// 		};

// 		if (this.fadingIn) {
// 			this.fadeIn();
// 		} else {
// 			this.fadeOut();
// 		};

// 		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

// 		const particleSizeDivider = window.innerWidth / window.innerHeight < 1.6 ? 2 : 1.1;
// 		const particleSize = Math.floor(window.innerHeight / particleSizeDivider);

// 		for (let i = 0; i < this.particlesAlpha.length; i++) {
// 			// this.ctx.save();
// 			// this.ctx.globalAlpha = this.particlesAlpha[i].toFixed(3);
// 			this.particles[i].render(particleSize);
// 			// this.ctx.restore();
// 		};

// 		if (this.running) {
// 			requestAnimationFrame(this.render);
// 		};
// 	};
// };

// export default Fog;
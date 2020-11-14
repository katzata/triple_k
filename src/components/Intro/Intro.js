import "./Intro.css";

const Content = require("../PageContent/assets.json");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const logo = new Image();
logo.src = Content.intro.img.logo;

let whiteNoise = document.createElement("audio");
whiteNoise.src = Content.intro.audio.static;

let whisper = document.createElement("audio");
whisper.src = Content.intro.audio.whisper;

let crack = document.createElement("audio");
crack.src = Content.intro.audio.crack;

class Intro {
	constructor() {
		this.running = true;
		this.mainCounter = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		this.logoX = canvas.width / 2;
		this.logoY = canvas.height / 2;
		this.logoCenterX = 0;
		this.logoCenterY = 0;
		this.logoAlpha = 0;
		this.logoAlphaIncrement = 0.005;
		this.logoSize = 0;
		this.logoSizeDivider = 5;
		this.fontSizeDivider = 19;
		this.textAlphaIncrement = 0.01;
		this.staticVolume = 0;
		this.whisperVolume = .15;
		this.volumeIncrement = 0.005;
		this.distortionStartFrame = [230, 290, 720];
		this.shadowBlur = 10;
		this.endingOffset = 0;
		this.endingAlphaAddition = .5;
		this.lettersStartFrame = 360;
		this.lettersDelay = 14;
		this.letterAlpha = [
			0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0,
		];

		this.audio = {
			playing: false,
			staticVolume: 0,
			whisperVolume: .15,
			crackVolume: .2,
			volumeIncrement: 0.005
		}
	}

	handleCanvasAndSizes() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		this.logoSize = canvas.height / this.logoSizeDivider;
		this.logoX = canvas.width / 2;
		this.logoY = canvas.height / 2;
		this.logoCenterX = -this.logoSize / 2;
		this.logoCenterY = -((this.logoSize * logo.height) / logo.width) / 2;
	}

	handleOffset() {
		let offsetX = 0;
		let offsetY = 0;
		
		if (this.mainCounter % 2 === 0) {
			offsetX = -Math.random();
			offsetY = -Math.random();
		} else {
			offsetX = Math.random();
			offsetY = Math.random();
		}

		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}

	handleLogo() {
		ctx.save();

		if (this.logoAlpha <= 1 && this.mainCounter <= 200) {
			this.logoAlpha += this.logoAlphaIncrement;
		} else {
			if (this.mainCounter < this.distortionStartFrame[2]) {
				this.logoAlpha = Math.random() + .6;
			}
		}

		if (this.mainCounter < this.distortionStartFrame[2]) {
			let distortion = [0, .002];
			ctx.transform(1, 0, distortion[Math.floor(Math.random() * 3)], 1, 0, 0);
			
			if (canvas.width < canvas.height) {
				ctx.translate(0, this.offsetY * 3);
			} else {
				ctx.translate(0, this.offsetY * 1.1);
			}
		}

		this.logoStage1();
		this.logoStage2();

		ctx.globalAlpha = this.logoAlpha;
		ctx.imageSmoothingEnabled = true;
		ctx.translate(this.logoCenterX, this.logoCenterY);
		ctx.drawImage(logo, this.logoX, this.logoY, this.logoSize, this.logoSize * logo.height / logo.width);
		ctx.restore();
	}

	logoStage1() {
		if (this.mainCounter >= this.distortionStartFrame[0] && this.mainCounter < this.distortionStartFrame[0] + 8) {
			this.offsetX = this.offsetX;
			this.offsetY = this.offsetY * 10;
			whiteNoise.volume = 0.5;
			this.logoAlpha = Math.random();

			ctx.save();
			ctx.scale(1, 1);

			switch (this.mainCounter) {
				case this.distortionStartFrame[0]:
					ctx.transform(1, 0, -.1, 1, 40 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				break;

				// case this.distortionStartFrame[0] + 1:
				// 	ctx.transform(1, 0, -.2, 1, 79 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				// break;

				case this.distortionStartFrame[0] + 2:
					ctx.transform(1, 0, -.3, 1, 119 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				break;

				// case this.distortionStartFrame[0] + 3:
				// 	ctx.transform(1, 0, -.4, 1, 158 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				// break;

				case this.distortionStartFrame[0] + 4:
					ctx.scale(1.1, 1.2);
					ctx.transform(1, 0, -.5, 1, 240 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				break;

				// case this.distortionStartFrame[0] + 5:
				// 	ctx.transform(1, 0, -.6, 1, 238 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				// break;

				case this.distortionStartFrame[0] + 6:
					ctx.transform(1, 0, -.5, 1, 240 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				break;

				// case this.distortionStartFrame[0] + 7:
				// 	ctx.transform(1, 0, -.4, 1, 158 + this.offsetX, -this.logoSize / 2 + this.offsetY);
				// 	this.logoAlpha = 1;
				// break;
			}
		}
	}

	logoStage2() {
		if (this.mainCounter >= this.distortionStartFrame[1] && this.mainCounter < this.distortionStartFrame[1] + 7) {
	
			this.logoAlpha = Math.random();
			whiteNoise.volume = 0.5;

			switch (this.mainCounter) {
				case this.distortionStartFrame[1]:
					ctx.rotate(22 * Math.PI / 180);
					ctx.transform(1, 0, .5, 1.3, -200 + this.offsetX * 5, -240 + this.offsetY * 5);
				break;

				case this.distortionStartFrame[1] + 1:
					ctx.rotate(22 * Math.PI / 180);
					ctx.transform(1, 0, .5, 1.3, -55 + this.offsetX * 5, -240 + this.offsetY * 5);
				break;

				case this.distortionStartFrame[1] + 2:
					ctx.rotate(22 * Math.PI / 180);
					ctx.transform(1, 0, .5, 1.3, -77 + this.offsetX * 5, -288 + this.offsetY * 5);
				break;

				case this.distortionStartFrame[1] + 3:
					ctx.rotate(0 * Math.PI / 180);
					ctx.transform(1, 0, 0, 1, 0 + this.offsetX * 5, 0 + this.offsetY * 5);
				break;

				case this.distortionStartFrame[1] + 4:
					ctx.rotate(25 * Math.PI / 180);
					ctx.transform(1.2, -1, .9, 2, -277 + this.offsetX * 5, -288 + this.offsetY * 5);
				break;

				case this.distortionStartFrame[1] + 5:
					ctx.rotate(22 * Math.PI / 180);
					ctx.transform(1, 0, .5, 1.3, -77 + this.offsetX * 5, -288 + this.offsetY * 5);
				break;

				case this.distortionStartFrame[1] + 6:
					ctx.rotate(0 * Math.PI / 180);
					ctx.transform(1, 0, 0, 1, 0 + this.offsetX * 5, 0 + this.offsetY * 5);
					
					this.logoAlpha = 1;
				break;
			}
		}
	}
	
	logoEnding(startFrame) {
		this.logoAlpha = Math.random() + this.endingAlphaAddition;

		let distortion = [0, .006];

		ctx.translate(0, this.endingOffset + this.offsetY * 2);
		ctx.transform(1, 0, this.staticVolume / 10 + distortion[Math.floor(Math.random() * 2)], 1, 0, 0);

		switch (this.mainCounter) {
			case this.distortionStartFrame[2] + startFrame + 1:
				this.staticVolume = .7;
				ctx.transform(1, 0, 0.3, 1.2, -this.logoSize / 1.2, -this.logoSize * 1.2 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 2:
				this.staticVolume = .5;
				ctx.transform(1, 0, .4, 1.4, -this.logoSize / 1.2, -this.logoSize * 1.4 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 3:
				this.staticVolume = .7;
				ctx.transform(1, 0, .3, 1.6, -160, -190);
			break;

			case this.distortionStartFrame[2] + startFrame + 4:
				ctx.transform(1, 0, .45, 1.8, -this.logoSize, -this.logoSize * 1.8 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 5:
				this.staticVolume = .75;
				ctx.transform(1, 0, .32, 1.5, -160, -190);
			break;

			case this.distortionStartFrame[2] + startFrame + 6:
				ctx.transform(1, 0, 0.3, 1.2, -this.logoSize / 1.2, -this.logoSize * 1.2 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 7:
				
				ctx.transform(1, 0, 0, 1, 0, 0);
			break;

			case this.distortionStartFrame[2] + startFrame + 8:
				ctx.transform(1, 0, 0, 1.3, 0, -40 + -this.logoSize * 1.3 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 9:
				ctx.transform(1.4, 0, 0, 1.5, -120, -this.logoSize * 1.5 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 10:
				this.staticVolume = .8;
				ctx.transform(1, 0, 0, 1.2, 0, -40 + -this.logoSize * 1.3 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 11:
				ctx.transform(1.3, 0, -.2, 1.5, -60, -this.logoSize * 1.5 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 12:
				ctx.transform(1.3, 0, -.4, 1.8, -0, -this.logoSize * 1.7 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 13:
				ctx.transform(1.2, 0, -.4, 2.2, 70, -this.logoSize * 2 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 14:
				ctx.rotate(-12 * Math.PI / 480);
				ctx.transform(1.2, 0, -.3, 2.4, 70, -this.logoSize * 2.1 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 15:
				ctx.rotate(-16 * Math.PI / 480);
				ctx.transform(1.4, 0, -.3, 2.6, -70, -this.logoSize * 2.3 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 16:
					ctx.transform(1.4, 0, -.4, 2.9, 0, -this.logoSize * 5.8 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 17:
				ctx.transform(1.4, 0, -.5, 3.6, 70, -this.logoSize * 6.9 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 18:
				ctx.transform(1.4, 0, -.6, 3, 100, -this.logoSize * 6 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 19:
				ctx.rotate(-50 * Math.PI / 480);
				ctx.transform(1.4, 0, -.7, 2.8, 100, -this.logoSize * 3 + this.offsetY);
			break;

			case this.distortionStartFrame[2] + startFrame + 19:
				ctx.rotate(50 * Math.PI / 480);
				ctx.transform(1.4, 0, -.7, 2.8, 90, -this.logoSize * 4 + this.offsetY);
			break;
		}
	} 

	handleText() {
		if (this.mainCounter >= this.lettersStartFrame) {
			ctx.save();

			if (canvas.width < canvas.height && canvas.width <= 980) {
				this.fontSizeDivider = 20;
			} else {
				this.fontSizeDivider = 19;
			}
			
			if (this.mainCounter >= this.distortionStartFrame[2] + 20) {
				ctx.globalAlpha = this.logoAlpha;
			}

			ctx.font = `${canvas.height / this.fontSizeDivider}px SpectralSC-Regular`;
			ctx.fillStyle = "black";
			ctx.textAligh = "center";
			ctx.textBaseline = "center";
			ctx.shadowBlur = this.shadowBlur;
			ctx.shadowColor = "rgba(255, 255, 255, 1)";
			ctx.strokeStyle = "#ffffff";

			let letterWidth = ctx.measureText("M").width;
			let letterWidth2 = ctx.measureText("K").width;
			let letterWidth3 = ctx.measureText("A").width;
			let letterWidth4 = ctx.measureText("E").width;
			let letterWidth5 = ctx.measureText("N").width;
			let letterWidth6 = ctx.measureText("S").width;
			let letterWidth7 = ctx.measureText("H").width;
			let letterWidth8 = ctx.measureText("C").width;
			let letterWidth9 = ctx.measureText("I").width;
			let letterWidth10 = ctx.measureText("V").width;

			let differences = [
				letterWidth - letterWidth2, //0 K
				letterWidth - letterWidth3, //1 A
				letterWidth - letterWidth4, //2 E
				letterWidth - letterWidth5, //3 N
				letterWidth - letterWidth6, //4 S
				letterWidth - letterWidth7, //5 H
				letterWidth - letterWidth8, //6 C
				letterWidth - letterWidth9, //7 I
				letterWidth - letterWidth10 //8 V
			]

			let difference = letterWidth - letterWidth2;

			if (this.mainCounter > this.lettersStartFrame) {
				if (this.letterAlpha[0] <= 1) {
					ctx.globalAlpha = this.letterAlpha[0];
					this.letterAlpha[0] += this.textAlphaIncrement;
				}

				ctx.fillText('K', canvas.width / 2 - (letterWidth * 7 - differences[0] * 8.1), canvas.height / 2 + differences[7]);
				ctx.fillText('K', canvas.width / 2 - (letterWidth * 7 - differences[0] * 8.1), canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay) {
				if (this.letterAlpha[1] <= 1) {
					ctx.globalAlpha = this.letterAlpha[1];
					this.letterAlpha[1] += this.textAlphaIncrement;
				}

				ctx.fillText('A', canvas.width / 2 - (letterWidth * 6 - differences[1] * 7.08), canvas.height / 2 + differences[7]);
				ctx.fillText('A', canvas.width / 2 - (letterWidth * 6 - differences[1] * 7.08), canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 2) {
				if (this.letterAlpha[2] <= 1) {
					ctx.globalAlpha = this.letterAlpha[2];
					this.letterAlpha[2] += this.textAlphaIncrement;
				}
				
				ctx.fillText('M', canvas.width / 2 - (letterWidth2 * 5 - differences[6] / 1.1), canvas.height / 2 + differences[7]);
				ctx.fillText('M', canvas.width / 2 - (letterWidth2 * 5 - differences[6] / 1.1), canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 3) {
				if (this.letterAlpha[3] <= 1) {
					ctx.globalAlpha = this.letterAlpha[3];
					this.letterAlpha[3] += this.textAlphaIncrement;
				}
				
				ctx.fillText('E', canvas.width / 2 - (letterWidth * 4 - differences[2] * 4.3) - differences[5], canvas.height / 2 + differences[7]);
				ctx.fillText('E', canvas.width / 2 - (letterWidth * 4 - differences[2] * 4.3) - differences[5], canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 4) {
				if (this.letterAlpha[4] <= 1) {
					ctx.globalAlpha = this.letterAlpha[4];
					this.letterAlpha[4] += this.textAlphaIncrement;
				}
				
				ctx.fillText('N', canvas.width / 2 - (letterWidth * 3 - differences[0] * 5.8) - differences[6], canvas.height / 2 + differences[7]);
				ctx.fillText('N', canvas.width / 2 - (letterWidth * 3 - differences[0] * 5.8) - differences[6], canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 5) {
				if (this.letterAlpha[5] <= 1) {
					ctx.globalAlpha = this.letterAlpha[5];
					this.letterAlpha[5] += this.textAlphaIncrement;
				}
				
				ctx.fillText('K', canvas.width / 2 - (letterWidth - difference), canvas.height / 2 + differences[7]);
				ctx.fillText('K', canvas.width / 2 - (letterWidth - difference), canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 6) {
				if (this.letterAlpha[6] <= 1) {
					ctx.globalAlpha = this.letterAlpha[6];
					this.letterAlpha[6] += this.textAlphaIncrement;
				}
				
				ctx.fillText('A', canvas.width / 2 - (letterWidth - difference) / 2 + differences[4], canvas.height / 2 + differences[7]);
				ctx.fillText('A', canvas.width / 2 - (letterWidth - difference) / 2 + differences[4], canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 7) {
				if (this.letterAlpha[7] <= 1) {
					ctx.globalAlpha = this.letterAlpha[7];
					this.letterAlpha[7] += this.textAlphaIncrement;
				}
				
				ctx.fillText('S', canvas.width / 2 + (letterWidth - differences[6]), canvas.height / 2 + differences[7]);
				ctx.fillText('S', canvas.width / 2 + (letterWidth - differences[6]), canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 8) {
				if (this.letterAlpha[8] <= 1) {
					ctx.globalAlpha = this.letterAlpha[8];
					this.letterAlpha[8] += this.textAlphaIncrement;
				}
				
				ctx.fillText('H', canvas.width / 2 + (letterWidth - differences[2]) * 2 - 1, canvas.height / 2 + differences[7]);
				ctx.fillText('H', canvas.width / 2 + (letterWidth - differences[2]) * 2 - 1, canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 9) {
				if (this.letterAlpha[9] <= 1) {
					ctx.globalAlpha = this.letterAlpha[9];
					this.letterAlpha[9] += this.textAlphaIncrement;
				}
				
				ctx.fillText('C', canvas.width / 2 + (letterWidth - differences[2]) * 3.05, canvas.height / 2 + differences[7]);
				ctx.fillText('C', canvas.width / 2 + (letterWidth - differences[2]) * 3.05, canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 10) {
				if (this.letterAlpha[10] <= 1) {
					ctx.globalAlpha = this.letterAlpha[10];
					this.letterAlpha[10] += this.textAlphaIncrement;
				}
				
				ctx.fillText('H', canvas.width / 2 + (letterWidth - difference) * 4 - (differences[6] + differences[1]), canvas.height / 2 + differences[7]);
				ctx.fillText('H', canvas.width / 2 + (letterWidth - difference) * 4 - (differences[6] + differences[1]), canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 11) {
				if (this.letterAlpha[11] <= 1) {
					ctx.globalAlpha = this.letterAlpha[11];
					this.letterAlpha[11] += this.textAlphaIncrement;
				}
				
				ctx.fillText('I', canvas.width / 2 + (letterWidth - difference) * 5 - (differences[6] + differences[5]), canvas.height / 2 + differences[7]);
				ctx.fillText('I', canvas.width / 2 + (letterWidth - difference) * 5 - (differences[6] + differences[5]), canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 12) {
				if (this.letterAlpha[12] <= 1) {
					ctx.globalAlpha = this.letterAlpha[12];
					this.letterAlpha[12] += this.textAlphaIncrement;
				}
				
				ctx.fillText('E', canvas.width / 2 + (letterWidth - differences[4]) * 6 + differences[6], canvas.height / 2 + differences[7]);
				ctx.fillText('E', canvas.width / 2 + (letterWidth - differences[4]) * 6 + differences[6], canvas.height / 2 + differences[7]);
			}

			if (this.mainCounter >= this.lettersStartFrame + this.lettersDelay * 13) {
				if (this.letterAlpha[13] <= 1) {
					ctx.globalAlpha = this.letterAlpha[13];
					this.letterAlpha[13] += this.textAlphaIncrement;
				}
				
				ctx.fillText('V', canvas.width / 2 + (letterWidth - differences[6]) * 7 - differences[7], canvas.height / 2 + differences[7]);
				ctx.fillText('V', canvas.width / 2 + (letterWidth - differences[6]) * 7 - differences[7], canvas.height / 2 + differences[7]);
			}
			
			ctx.restore();
		}
	}

	handleStatic() {
		if (this.audio.playing) {
			whiteNoise.play();
			whiteNoise.volume = this.staticVolume;
			this.staticVolume < 0.22 ? this.staticVolume += this.volumeIncrement : null;
		}
	}

	handleWhisper() {
		if (this.mainCounter >= this.lettersStartFrame && this.audio.playing) {
			whisper.play();
			whisper.volume = this.whisperVolume;
		}
	}

	handleIntro() {
		if (this.mainCounter >= this.distortionStartFrame[2] /*&& this.mainCounter < this.distortionStartFrame[2] + 10*/) {	
			if (this.mainCounter >= this.distortionStartFrame[2] && this.mainCounter <= this.distortionStartFrame[2] + 40) {
				if (this.endingAlphaAddition > -.3) {
					this.endingAlphaAddition -= .05;
				}

				if (this.endingOffset <= 8) {
					this.endingOffset += 0.5;
					this.staticVolume += this.volumeIncrement * 3;
				}
			}

			//   TEMPORARY  //
			const startFrame = 89;
			//   TEMPORARY  //

			this.logoEnding(startFrame);

			if (this.mainCounter > this.distortionStartFrame[2] + startFrame + 20) {
				this.audio.playing = false;
				whiteNoise.pause();
				whisper.pause();

				crack.play();
				crack.volume = this.audio.crackVolume;

				this.running = false;
			}
		}
	}

	render() {
		this.handleCanvasAndSizes();
		this.mainCounter++;
		this.handleOffset();
		if (!this.audio.playing) this.audio.playing = true;

		this.handleIntro();
		this.handleStatic();
		
		if (this.mainCounter < this.distortionStartFrame[2] + 89 + 20) {
			this.handleLogo();
			this.handleText();
			this.handleWhisper();
		}
	}
}

export default Intro;
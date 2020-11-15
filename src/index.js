import "./index.css";
import Intro from "./components/Intro/Intro.js";
import MainPage from "./components/MainPage/MainPage.js";

let intro = new Intro();
let mainPage = new MainPage();

(function initialLoop() {
	// if (intro.running) {
	// 	intro.render();
	// } else {
		mainPage.render();
	// }

	if (!mainPage.renderSection) {
		window.requestAnimationFrame(initialLoop);
	} else {
		mainLoop();
	}
})()

function mainLoop() {
	mainPage.handlePageWidth();
	mainPage.handleCanvas();
	
	if (mainPage.humanShape.displaying) {
		mainPage.handleHumanShape();
	} else {
		// mainPage.humanShape.displaying = true;
	};

	mainPage.handleCrack();
	mainPage.handleImageCanvas(mainPage.humanShape.displaying);

	if (mainPage.renderSection) {
		window.requestAnimationFrame(mainLoop);
	}
}

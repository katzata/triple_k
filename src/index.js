import "./index.scss";

import langs from "./localisation/langs";
import { updateLocation } from "./router/router";

import headerComponent from "./components/core/Header/Header";

const currentLang = "en";
const Header = new headerComponent(langs[currentLang].index.header);
const root = document.querySelector("#root");

const mainSection = document.createElement("main");

root.appendChild(Header.render());
root.appendChild(mainSection);
updateLocation();
// console.log(langs);

// document.querySelector("#root").appendChild(Header.render());


// import Intro from "./components/Intro/Intro.js";
// import MainPage from "./components/MainPage/MainPage.js";

// let intro = new Intro();
// let mainPage = new MainPage();

// (function initialLoop() {
// 	// if (intro.running) {
// 	// 	intro.render();
// 	// } else {
// 		mainPage.render();
// 	// }

// 	if (!mainPage.renderSection) {
// 		window.requestAnimationFrame(initialLoop);
// 	} else {
// 		mainLoop();
// 	}
// })()

// function mainLoop() {
// 	mainPage.handlePageWidth();
// 	mainPage.handleCanvas();
	
// 	if (mainPage.humanShape.displaying) {
// 		mainPage.handleHumanShape();
// 	};

// 	mainPage.handleCrack();
// 	mainPage.handleImageCanvas(mainPage.humanShape.displaying);

// 	if (mainPage.renderSection) {
// 		window.requestAnimationFrame(mainLoop);
// 	}
// }
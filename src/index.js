import "./index.scss";

// import langs from "./localisation/langs";
import { checkLanguages } from "./localisation/langs";
import { updateLocation } from "./router/router";

import Header from "./components/core/Header/Header";
import MainCanvas from "./components/core/FogCanvas/FogCanvas";

const addHeader = () => {
    const header = new Header();
    return header.render();
};

const addMainCanvas = () => {
    const mainCanvas = new MainCanvas();
    return mainCanvas.render();
};

const init = () => {
    const root = document.querySelector("#root");
    const mainSection = document.createElement("main");

    checkLanguages();
    root.appendChild(addHeader());
    root.appendChild(addMainCanvas());
    root.appendChild(mainSection);
    updateLocation("/");
};

init();

// const reRender = () => {
//     const newHeader = addHeader();
//     const currentHeader = document.querySelector("header");

//     currentHeader.replaceChildren(newHeader.children);
// };

// console.log(langs);

// document.querySelector("#root").appendChild(header.render());


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
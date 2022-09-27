import "./index.scss";

import { pageTransition } from "./utils/utils";
import { checkLanguages } from "./localisation/langs";
import { setCoreComponents, route } from "./router/router";

import Header from "./components/core/Header/Header";
import Footer from "./components/core/Footer/Footer";
import FogCanvas from "./components/core/FogCanvas/FogCanvas";

const header = new Header();
const footer = new Footer();
const fogCanvas = new FogCanvas();

const init = () => {
    const root = document.querySelector("#root");
    const mainSection = document.createElement("main");

    checkLanguages();

    root.appendChild(fogCanvas.render());
    root.appendChild(header.render());
    root.appendChild(mainSection);
    root.appendChild(footer.render());

    setCoreComponents({ header, mainSection, footer, fogCanvas })
    route(pageTransition);
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
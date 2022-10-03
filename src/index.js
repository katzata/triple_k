import "./index.scss";

import { pageTransition } from "./utils/utils";
import { checkLanguages } from "./localisation/langs";
import { /* setCoreComponents, */ route } from "./router/router";
import { setCoreComponents } from "./utils/utils";

import Header from "./components/core/Header/Header";
import Footer from "./components/core/Footer/Footer";
import MainCanvas from "./components/core/MainCanvas/MainCanvas";

const header = new Header();
const footer = new Footer();
const mainCanvas = new MainCanvas();

const init = () => {
    const root = document.querySelector("#root");
    const mainSection = document.createElement("main");

    checkLanguages();

    root.appendChild(mainCanvas.render());
    root.appendChild(header.render());
    root.appendChild(mainSection);
    root.appendChild(footer.render());

    setCoreComponents({ header, mainSection, footer, mainCanvas })
    route(pageTransition);
};

init();
import "./index.scss";
import "./utils/handlebarsHelpers";

import { pageTransition, setCoreComponents } from "./utils/utils";
import { route } from "./router/router";

import Header from "./components/core/Header/Header";
import Footer from "./components/core/Footer/Footer";
import MainCanvas from "./components/core/MainCanvas/MainCanvas";

const header = new Header();
const footer = new Footer();
const mainCanvas = new MainCanvas();

const init = () => {
    const root = document.getElementById("root");
    const mainSection = document.createElement("main");

    root.appendChild(mainCanvas.render());
    root.appendChild(header.render());
    root.appendChild(mainSection);
    root.appendChild(footer.render());

    // Store references to these 4 components for use by other components avoiding some DOM traversals and additional instancing.
    setCoreComponents({ header, mainSection, footer, mainCanvas });

    // Routing starts asap .
    route(pageTransition);
};

init();
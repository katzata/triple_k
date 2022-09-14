import routes from "./routes";
import { toggleHomeLinkVisibility } from "../utils/utils";

export const route = async () => {
    const path = window.location.pathname;
    const keys = Object.keys(routes);

    if (keys.includes(path)) {
        const newPage = routes[path].render();
        pageTransition(newPage);
    } else {
        console.log("path", path);
    };
};

export const updateLocation = (url) => {
    if (url) {
        window.history.pushState({}, url.split("/").pop(), url);
    } else {
        const browserUrl = window.location.pathname;
        window.history.pushState({}, browserUrl.split("/").pop(), browserUrl);
    };

    route(url);
    toggleHomeLinkVisibility(url);
};

const pageTransition = (newPage) => {
    const targetSection = document.querySelector("main");
    const currentPage = targetSection.firstChild;

    targetSection.onanimationend = (e) => {
        if (e.animationName === "fadeOut") {
            e.target.replaceChildren(newPage);
            e.target.className = "fadeIn";
        };
    };
    
    if (currentPage) {
        targetSection.className = "fadeOut";
    } else {
        targetSection.appendChild(newPage);
        targetSection.className = "fadeIn";
    };
};

window.addEventListener("click", (e) => {
    const { className, href } = e.target;

    if (className.includes("navLinks")) {
        const link = href.split("/").pop();
        
        if (link !== "katzata") {
            e.preventDefault();
            updateLocation(href);
        };
    };
});

window.addEventListener("popstate", event => {
    console.log("x", event);
    // Grab the history state id
    // let stateId = event.state.id;
    
    // Show clicked id in console (just for fun)
    // console.log("stateId = ", stateId);
    
    // Visually select the clicked button/tab/box
    // select_tab(stateId);
    
    // Load content for this tab/page
    // load_content(stateId);
});

window.addEventListener("pushstate", event => {
    console.log(event);
    // Grab the history state id
    // let stateId = event.state.id;
    
    // Show clicked id in console (just for fun)
    // console.log("stateId = ", stateId);
    
    // Visually select the clicked button/tab/box
    // select_tab(stateId);
    
    // Load content for this tab/page
    // load_content(stateId);
});
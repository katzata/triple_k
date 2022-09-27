import routes from "./routes";
import { toggleHomeLinkVisibility, pageTransition } from "../utils/utils";

let coreComponents = {};

export const route = (callback) => {
    const targetSection = document.querySelector("main");
    const path = window.location.pathname;
    const keys = Object.keys(routes);

    if (keys.includes(path)) {
        const newPage = routes[path]();

        if (callback) {
            callback({ targetSection, ...coreComponents }, newPage);
        } else {
            targetSection.replaceChildren(newPage.render());
        };
    } else {
        console.log("wrong path", path);
    };
};

export const setCoreComponents = (components) => {
    coreComponents = components;
};

export const updateLocation = (url) => {
    if (url) {
        const pageTitle = url.split("/").pop();
        updateDocumentTitle(pageTitle);
        window.history.pushState({ page: pageTitle }, pageTitle, url);
        
        toggleHomeLinkVisibility(url);
        route(pageTransition);
    };
};

const updateDocumentTitle = (path) => {
    const subtitles = {
        "": "",
        "/": "",
        certificates: " - demonic arts",
        interactivecv: " - maximum violence",
        projects: " - can cause blindness"
    };

    document.title = `Triple K ${subtitles[path]}`;
};

window.addEventListener("click", (e) => {
    const { className, href } = e.target;

    if (typeof className === "string" && className.includes("navLinks")) {
        const link = href.split("/").pop();
        
        if (link !== "katzata") {
            e.preventDefault();
            updateLocation(href);
        };
    };
});


window.addEventListener("popstate", (e) => {
    const { pathname } = e.target.location;

    updateDocumentTitle(pathname.slice(1));
    route(pageTransition);
    toggleHomeLinkVisibility(pathname);
});
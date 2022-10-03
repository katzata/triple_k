import routes from "./routes";
import { toggleHomeLinkVisibility, pageTransition } from "../utils/utils";
import { coreComponents } from "../utils/utils";

let routing = false;

export const route = (callback) => {
    const targetSection = document.querySelector("main");
    const path = window.location.pathname;
    const keys = Object.keys(routes);
    toggleHomeLinkVisibility(path);

    if (keys.includes(path)) {
        const newPage = routes[path]();

        if (callback) {
            callback({ targetSection, ...coreComponents }, newPage, () => routing = false);
        } else {
            targetSection.replaceChildren(newPage.render());
        };
    } else {
        console.log("wrong path", path);
        routing = false;
    };
};

export const updateLocation = (url) => {
    if (!routing && url) {
        const pageTitle = url.split("/").pop();
        routing = true;
        updateDocumentTitle(pageTitle);
        window.history.pushState({ page: pageTitle }, pageTitle, url);

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
    const { tagName, href } = e.target;

    if (tagName === "A") {
        const link = href.split("/").pop();

        if (link !== "katzata") {
            e.preventDefault();
            if (href !== window.location.href) updateLocation(href);
        };
    };
});


window.addEventListener("popstate", (e) => {
    const { pathname } = e.target.location;

    updateDocumentTitle(pathname.slice(1));
    route(pageTransition);
    toggleHomeLinkVisibility(pathname);
});
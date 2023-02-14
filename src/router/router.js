import routes from "./routes";
import { pageTransition, coreComponents } from "../utils/utils";

/**
 * Indicates if there is currently running routing.
 * Needed for the page fades.
 */
export let routing = false;

/**
 * Function handling the routing when the url cahnges.
 * @param {Function} callback A function to be executed if passed in.
 */
export const route = (callback) => {
    const targetSection = coreComponents.mainSection;
    const path = window.location.pathname;
    const keys = Object.keys(routes);

    if (keys.includes(path)) {
        const newPage = routes[path]();

        if (callback) {
            callback({ targetSection, ...coreComponents }, newPage, () => routing = false);
        } else {
            targetSection.replaceChildren(newPage.render());
        };
    } else {
        const newPage = routes["/404"]();
        targetSection.replaceChildren(newPage.render());

        routing = false;
    };
};

/**
 * Function that updates the window.history.
 * Runs the updateDocumentTitle function.
 * Runs the route function.
 * @see route
 * @param {String} url window.location.pathname.
 */
export const updateLocation = (url) => {
    if (!routing && url) {
        const pageTitle = url.split("/").pop();
        routing = true;
        updateDocumentTitle(pageTitle);
        window.history.pushState({ page: pageTitle }, pageTitle, url);

        route(pageTransition);
    };
};

/**
 * Function that updates the document title accourdingly when navigating to different pages.
 * @param {String} path windows.location.pathname (windows.location.pathname.split("/").pop()).
 */
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

/**
 * A global click event listener to help a bit with the routing.
 * In order for a link (a tag) to be ignored by the router, it should have a data-route attribute to "ignore".
 */
window.addEventListener("click", (e) => {
    const { tagName, href, dataset, target } = e.target;

    if (tagName === "A") {
        if (target !== "_blank") {
            e.preventDefault();
            if (href !== window.location.href) updateLocation(href);
        };
    };
});

/**
 * A global popstate event listener to help a bit with the routing.
 * Handling the page transitions, document title, routing and the home page link when the user clicks on the back button in the browser.
 * 
 */
window.addEventListener("popstate", (e) => {
    const { pathname } = e.target.location;

    updateDocumentTitle(pathname.slice(1));
    route(pageTransition);
    toggleHomeLinkVisibility(pathname);
});
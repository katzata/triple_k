import routes from "./routes";
import { toggleHomeLinkVisibility } from "../utils/utils";
import Header from "../components/core/Header/Header";

export const route = () => {
    const path = window.location.pathname;
    const keys = Object.keys(routes);

    if (keys.includes(path)) {
        const newPage = routes[path]().render();
        pageTransition(newPage);
    } else {
        console.log("wrong path", path);
    };
};

export const updateLocation = (url) => {
    // console.log(url);
    if (url) {
        const pageTitle = url.split("/").pop();
        updateDocumentTitle(pageTitle);
        window.history.pushState({ page: pageTitle }, pageTitle, url);
        
        toggleHomeLinkVisibility(url);
        route();
    };
};

const pageTransition = (newPage) => {
    const targetSection = document.querySelector("main");
    const currentPage = targetSection.firstChild;

    targetSection.onanimationend = (e) => {
        if (e.animationName === "fadeOut") {
            e.target.replaceChildren(newPage);
            e.target.className = "fadeIn";
            // if (window.location.hash.slice(1) !== localStorage.lang) {
                const header = new Header().render();
                console.log(header.children);
                document.querySelector("header").replaceChildren(...header.children);
                console.log(window.location.hash.slice(1), localStorage.lang);
            // };
            // console.log(document.querySelector("header"));
        };
    };
    
    if (currentPage) {
        targetSection.className = "fadeOut";
    } else {
        targetSection.appendChild(newPage);
        targetSection.className = "fadeIn";
    };
};

const updateDocumentTitle = (path) => {
    const subtitles = {
        "": "",
        certificates: "dark matter",
        interactivecv: "safe to touch",
        projects: "can cause blindness"
    };

    document.title = `Triple K ${path !== "" ? `- ${subtitles[path]}` : ""}`;
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


// ////////////////////////////
window.addEventListener("popstate", (e) => {
    route(e.target.location.pathname);
    toggleHomeLinkVisibility(e.target.location.pathname);
});
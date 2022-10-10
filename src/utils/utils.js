export let coreComponents = {};

export const setCoreComponents = (components) => {
    coreComponents = components;
};

export const capitalise = (text) => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
};

export const toggleHomeLinkVisibility = (url = "/") => {
    const path = url.split("/").pop();
    const navMain = document.querySelector(".navMain");
    
    navMain.style.transform = path === "" ? "translateY(0)" : "translateY(100%)";
    navMain.style.opacity = path === "" ? "0" : "1";
    navMain.style.zIndex = path === "" ? "-1" : "0";
};

export const pageTransition = ({ targetSection, fogCanvas, header, footer }, page, endRouting) => {
    const currentPage = targetSection.firstChild;

    targetSection.onanimationend = (e) => {
        if (e.animationName === "sectionFadeOut") {
            // const newPage = page.render();
            // console.log(newPage);
            e.target.replaceChildren(page.render());
            e.target.className = "sectionFadeIn";
        };

        if (e.animationName === "sectionFadeIn") endRouting();
    };
    
    if (currentPage) {
        targetSection.className = "sectionFadeOut";
    } else {
        targetSection.appendChild(page.render());
        targetSection.className = "sectionFadeIn";
    };
};

export const langTransition = ({ targetSection, mainCanvas, header, footer }, page) => {
    mainCanvas.siblings = [header, targetSection, footer];
    mainCanvas.fogAnimationRunning = true;
    mainCanvas.page = page;
};
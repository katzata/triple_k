export const capitalise = (text) => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
};

export const toggleHomeLinkVisibility = (url = "/") => {
    const path = url.split("/").pop();
    const state = path === "" ? "sectionFadeOut" : "sectionFadeIn";
    const test = document.querySelector(".navMain");
    
    test.className = "navLinks navMain " + state;
};

export const pageTransition = ({ targetSection, fogCanvas, header, footer }, page) => {
    const currentPage = targetSection.firstChild;

    targetSection.onanimationend = (e) => {
        if (e.animationName === "sectionFadeOut") {
            e.target.replaceChildren(page.render());
            e.target.className = "sectionFadeIn";
        };
    };
    
    if (currentPage) {
        targetSection.className = "sectionFadeOut";
    } else {
        targetSection.appendChild(page.render());
        targetSection.className = "sectionFadeIn";
    };
};

export const langTransition = ({ targetSection, fogCanvas, header, footer }, page) => {
    fogCanvas.siblings = [header, targetSection, footer];
    fogCanvas.isVisible = true;
    fogCanvas.fadeIn = true;
    fogCanvas.page = page;
};
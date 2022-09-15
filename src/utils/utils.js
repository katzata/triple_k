export const capitalise = (text) => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
};

export const toggleHomeLinkVisibility = (url = "/") => {
    const path = url.split("/").pop();
    const state = path === "" ? "fadeOut" : "fadeIn";
    const test = document.querySelector(".navMain");
    
    test.className = "navLinks navMain " + state;
};

export const animationLoop = () => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
};
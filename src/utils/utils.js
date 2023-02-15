export let coreComponents = {};

/**
 * Function that sets the core components object for later sharing throughout the app.
 * Intended for use once in index.js when the app initialises.
 * @param {Array} components Core component instances that will be shared with other components (currently: header, main, footer, mainCanvas).
 */
export const setCoreComponents = (components) => {
    coreComponents = components;
};

/**
 * Utility function capitalising the first letter of a sepcific text.
 * @param {String} text The input text.
 * @returns accordingly formated text.
 */
export const capitalise = (text) => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
};

/**
 * Callback function used to handle page and core component transitions and update the content appropriately.
 * @param {Object} param0 Object containing the target section and core components (only target is used). Gets passed down from the route function.
 * @see router.js
 * @param {classInstance} page A newly created instance of a specified page.
 * @param {Function} endRouting A callback that ends the routing task enabling further routing. 
 * !!!
 * This limitation is in place in order to accomodate the component transitions when the routing task is running.
 * By not being able to navigate while transitioning the animations will not be interrupted.
 * !!!
 */
export const pageTransition = ({ targetSection }, page, endRouting) => {
    const currentPage = targetSection.firstChild;

    targetSection.onanimationend = (e) => {
        if (e.animationName === "sectionFadeOut") {
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
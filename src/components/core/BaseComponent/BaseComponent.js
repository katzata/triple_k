import { checkLanguages } from "../../../localization/langs";

/**
 * Creates a component (HTMLElement) that is ready to append to the dom.
 * Can take in a "handlebars" (imported) template or it can generate content with the helper method "createElement".
 * Before initialisation "this.component" must not be null (needs and html tag).
 * !!!
 * Do not set the id of the root element "this.component" directly. Use the id property which will set the component id when necessary.
 * !!!
 * @class
 */
class BaseComponent {
    /**
     * Base component from which to inherit.
     * @param {HTMLElement} component The root html element of the current component (the element that will be returned unpon rendering the component).
     * @param {String} id The id that will be assigned to the html element "this.component".
     * @param {Object} currentLang The current language is set upon rendering the component.
     * @param {Function} template Takes an imported (unrendered) hadlebars template function reference. Will be ran unpon rendering the component.
     * @param {Function} templateData Takes an arrow function which must return an object containing the necessary handlebars template data. Will be added to the template unpon rendering the component.
     * @param {Array} subComponents An array containing all component/elements that will be appended to the current component "this.component". Will be ran unpon rendering the component.
     * @param {Array} childSubComponents An array containing all component/elements that will be appended to specific child elements of the current component "this.component". Will be ran unpon rendering the component.
     * @param {Array} eventHandlers An array of objects/event handlers to append to specific elements from the current component.
     * @see addEventHandlers
     */
    constructor() {
        this.component = null;
        this.id = "";
        this.currentLang = null;
        this.template = null;
        this.templateData = null;
        this.subComponents = null;
        this.childSubComponents = null;
        this.eventHandlers = null;
        this.postRenderFunctions = null;

        /**
         * Checks if the current component is attached to the dom.
         * First checks if the component id is set (means the component has all necessary data), and then thecks if its present in the dom.
         * @returns {boolean}
         */
        this.isAttached = () => this.component && this.component.id && document.getElementById(`${this.component.id}`);
    };

    /**
     * Runs constantly at around 60fps by default, using requestAnimationFrame.
     * The "isAttached" check breaks the loop as soon as the component is removed from the dom.
     * @param {Array} animations Function references to be ran during the specified keyframes. 
     * @param {Number} customDelay A whole number (no floating points) representing the delay between each keyframe.
     */
    animationsLoop(animations, customDelay) {
        const delay = customDelay ? customDelay : Math.floor(1000 / 60);
        let prevTime = new Date().getTime();
        
        const loop = () => {
            if (animations) {
                const currentTime = new Date().getTime();

                if (currentTime - prevTime > delay) {
                    prevTime = currentTime;
                    for (const animation of animations) animation();
                };
            };
            
            if (this.isAttached() !== null) window.requestAnimationFrame(loop);
        };

        loop();
    };

    /**
     * Adds a child component to the main component (this.component).
     * Runs wehn the "render" function is called.
     * Used an arrow function in order to keep the the scope here.
     * @param {Array} components Can be a nested (2d) array of components as functions or HTMLElements.
     */
    addSubComponents = (components) => {
        try {
            for (const component of components) {
                const rawComponent = component instanceof Function ? component() : component;
            
                if (rawComponent instanceof Array) {
                    rawComponent.map(el => this.component.appendChild(el))
                } else {
                    this.component.appendChild(component instanceof Function ? component() : component);
                };
            };
        } catch (err) {
            return err;
        };
    };

    /**
     * Adds a child component to elements already appended to the main component (this.component), querying the component itself.
     * Runs wehn the "render" function is called.
     * @param {Array} components Can take a nested (2d) array ["target", component/component()] components as functions or HTMLElements.
     */
    addChildSubComponents = (components) => {
        try {
            for (const [target, component] of components) {
                const selector = target.charAt(0) !== "." ? "querySelector" : "querySelectorAll";
                const subChild = this.component[selector](target);
    
                if (subChild) {
                    if (selector === "querySelector") {
                        subChild.appendChild(component);
                    } else {
                        Array.from(subChild).forEach(el => el.appendChild(component));
                    };
                };
            };
        } catch (err) {
            return err;
        };
    };

    /**
     * Helper function for easyer html element creation.
     * @param {String} type The html tag;
     * @param {Object} options The html element attributes.
     * @param {Array} children Other html elements that will be appended to the newly created element.
     * @returns {HTMLElement} The newly created html element.
     */
    createElement(type, options, children) {
        try {
            const element = document.createElement(type);

            if (options) {
                Object.entries(options).forEach(([attr, value]) => element[attr] = value);
            };

            if (children) {
                children.forEach((child) => {
                    if (child instanceof Array) {
                        child.forEach(el => element.appendChild(el));
                    } else {
                        element.appendChild(child)
                    };
                });
            };

            return element;
        } catch (err) {
            return err;
        };
    };

    /**
     * Helper function providing a ranged random number.
     * Mostly uset to do a trembling effect.
     * @param {Number} num Represents the range of the randomly generated number. The calculation goes from -num/2 to +num/2.
     * @returns {Number} The randomly generated number.
     */
    random(num) {
        return !num ? Math.random() : Math.ceil((Math.random() * num) - (num / 2));
    };

    /**
     * Iterates over the provided handlers and adds them to the specified components.
     * @param {Array} eventHandlers An array of objects consisting of { "targetId" or "targetClass", "event", handler }
     * @param {String} eventHandler.targetId The target id.
     * @param {String} eventHandler.targetClass The target className.
     * @param {String} eventHandler.event The event name.
     * @param {Function} eventHandler.handler A function reference.
     */
    addEventHandlers(eventHandlers) {
        try {
            for (const { targetId, targetClass, event, handler } of eventHandlers) {
                const selector = targetId ? "querySelector" : "querySelectorAll";
                const selected = this.component[selector](`${targetId || targetClass}`);
               
                if (selected instanceof HTMLElement) {
                    selected[event] = handler;
                } else {
                    const items = Array.from(selected);
    
                    for (let i = 0; i < items.length; i++) {
                        if ((targetId || targetClass) && event && handler) items[i][event] = (e) => handler(e, i);
                    };
                };
            };
        } catch (err) {
            return err;
        };
    };

    /**
     * Removes the top html element "this.component" from the dom.
     */
    remove() {
        this.component.remove();
    };

    /**
     * Method that runs specified functions (defined in the this.postComponentPrepFunctions array).
     * Runs after all necessary data has been set and the component is about to render.
     */
    postComponentPrep() {
        if (this.postComponentPrepFunctions) {
            for (const postComponentPrepFn of this.postComponentPrepFunctions) {
                postComponentPrepFn();
            };
        };
    };

    /**
     * Initiates all the set porperties, attributes and handlers associated with the current component.
     * Uses the imported checkLanguages function from localization/langs.js.
     * @returns {HTMLElement} The newly created html element "this.component";
     */
    render() {
        this.currentLang = checkLanguages();

        if (this.component && this.component.id !== this.id) this.component.id = this.id;
        if (this.template !== null) this.component.innerHTML = this.template(this.templateData ? this.templateData() : null);
        if (this.subComponents !== null) this.addSubComponents(this.subComponents);
        if (this.childSubComponents !== null) this.addChildSubComponents(this.childSubComponents);
        if (this.eventHandlers !== null) this.addEventHandlers(this.eventHandlers);
        if (this.postComponentPrepFunctions !== null) this.postComponentPrep();

        return this.component;
    };

    /**
     * Returns this component's className.
     * @returns {String}
     */
    get className() {
        return this.component.className;
    };
    
    /**
     * @param {String} classes A new className for the current component.
     */
    set className(classes) {
        this.component.className = classes;
    };

    /**
     * @param {Function} animationEndFn A function reference to be ran on the current component's animation end.
     */
    set onanimationend(animationEndFn) {
        this.component.onanimationend = animationEndFn;
    };
};

export default BaseComponent;
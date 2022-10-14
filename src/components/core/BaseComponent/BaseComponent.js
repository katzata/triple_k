import langs, {checkLanguages} from "../../../localisation/langs";

class BaseComponent {
    constructor() {
        this.component = null;
        this.id = "";
        this.currentLang = null;
        this.template = null;
        this.templateData = null;
        this.subComponents = null;
        this.childSubComponents = null;
        this.shadowElements = [];
        this.langs = langs;
        this.eventHandlers = null;
        this.isAttached = () => this.component.id && document.querySelector(`#${this.component.id}`);
    };

    animationsLoop(animations, customDelay) {
        const delay = customDelay ? customDelay : Math.floor(1000 / 60);
        let prevTime = new Date().getTime();
        
        const loop = () => {
            if (animations) {
                const currentTime = new Date().getTime();
                if (!this.animationsRunning) this.animationsRunning = true;

                if (currentTime - prevTime > delay) {
                    prevTime = currentTime;
                    for (const animation of animations) animation();
                };
            };

            if (this.isAttached() !== null) window.requestAnimationFrame(loop);
        };

        loop();
    };

    addSubComponents = (components) => {
        for (const component of components) {
            const rawComponent = component() || component;
            
            if (rawComponent instanceof Array) {
                rawComponent.map(el => this.component.appendChild(el))
            } else {
                this.component.appendChild(component() || component);
            };
        };
    };

    addChildSubComponents = (components) => {
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
    };

    createElement(type, options, children) {
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
    };

    random(num) {
        return !num ? Math.random() : Math.ceil((Math.random() * num) - (num / 2));
    };

    addEventHandlers() {
        for (const { targetId, targetClass, event, handler } of this.eventHandlers) {
            const selector = targetId ? "querySelector" : "querySelectorAll";
            const selected = this.component[selector](`${targetId || targetClass}`);

            if (selected instanceof HTMLElement) {
                selected[event] = handler;
            } else {
                const items = Array.from(selected);

                for (let i = 0; i < items.length; i++) {
                    items[i][event] = (e) => handler(e, i);
                };
            };
        };
    };

    remove() {
        this.component.remove();
    };

    append() {
        document.querySelector("#root").appendChild(this.component);
    };

    render() {
        this.currentLang = checkLanguages();

        if (this.component.id !== this.id) this.component.id = this.id;
        if (this.template !== null) this.component.innerHTML = this.template(this.templateData ? this.templateData() : null);
        if (this.subComponents !== null) this.addSubComponents(this.subComponents);
        if (this.childSubComponents !== null) this.addChildSubComponents(this.childSubComponents);
        if (this.eventHandlers) this.addEventHandlers();

        // const existingComponent = document.querySelector(`#${this.id}`);
        // if (existingComponent && this.component.children.length > 0) {
        //     existingComponent.replaceChildren(...this.component.children);
        // } else {
        //     return this.component;
        // };

        return this.component;
    };

    get className() {
        return this.component.className;
    };

    set className(classes) {
        this.component.className = classes;
    };

    set onanimationend(animationEndFn) {
        this.component.onanimationend = animationEndFn;
    };
};

export default BaseComponent;
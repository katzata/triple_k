import langs, {checkLanguages} from "../../../localisation/langs";
import { addGlobalListener } from "../../../utils/globalListeners";

class BaseComponent {
    constructor() {
        this.component = null;
        this.id = this.constructor.name[0].toLocaleLowerCase() + this.constructor.name.slice(1);
        this.currentLang = null;
        this.template = null;
        this.templateData = null;
        this.subComponents = null;
        this.childSubComponents = null;
        this.shadowElements = [];
        this.langs = langs;
        this.events = [];
        this.runAnimations = false;
    };

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

            window.requestAnimationFrame(loop);
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
        const componentChildren = Array.from(this.component.children);

        for (const [target, component] of components) {
            if (component instanceof Array) {
                component.map(el => {
                    console.log("x", target, componentChildren.querySelector("#imageContainer"));
                    // this.component.appendChild(el)
                });
            } else {
                for (const child of componentChildren) {
                    const targetChild = child.querySelector("#imageContainer");

                    if (targetChild) {
                        targetChild.appendChild(component);
                        break;
                    };
                };
                // console.log(target, componentChildren[0].querySelector("#imageContainer"));
                // this.component.appendChild(component() || component);
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

    addListeners() {
        // console.log(this.events);
        for (const { item, event, handler } of this.events) {
            item[event] = handler;
            // console.log(item[event]);
        }
    };

    remove() {
        this.component.remove();
    };

    append() {
        document.querySelector("#root").appendChild(this.component);
    };

    render = () => {
        this.currentLang = checkLanguages();

        if (this.component.id !== this.id) this.component.id = this.id;
        if (this.templateData) this.component.innerHTML = this.template(this.templateData());
        if (this.subComponents !== null) this.addSubComponents(this.subComponents);
        if (this.childSubComponents !== null) this.addChildSubComponents(this.childSubComponents);
        // if (this.shadowElements.length > 0) this.shadowElements.forEach(([el, text]) => {
            
        // });

        const existingComponent = document.querySelector(`#${this.id}`);
        if (existingComponent) {
            existingComponent.replaceChildren(...this.component.children);
        } else {
            return this.component;
        };
    };

    get className() {
        return this.component.className;
    };

    set className(classes) {
        this.component.className = classes;
    };

    onanimationend(animationEndFn) {
        this.component.onanimationend = animationEndFn;
    };
};

export default BaseComponent;
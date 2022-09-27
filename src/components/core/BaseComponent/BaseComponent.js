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
        this.langs = langs;
        this.events = [];
        this.runAnimations = false;
    };

    animationsLoop(animations, customDelay) {
        const delay = customDelay ? customDelay : Math.ceil(1000 / 60);
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
            // if (Array.isArray(component)) {
            //     const [{ type, attr }, node] = component;
            //     const element = this.createElement(type, attr);
            //     continue;
            // };

            // console.log(component());

            this.component.appendChild(component() || component);
        };
    };

    createElement(type, options, children) {
        const element = document.createElement(type);

        if (options) {
            Object.entries(options).forEach(([attr, value]) => element[attr] = value);
        };

        if (children) {
            children.forEach((child) => element.appendChild(child));
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
        if (this.events.length !== 0) {
            // for (const event of this.events) {
            //     addGlobalListener(event);
            // };
        };


        ///////////////////////////////////////////////////////////
        if (this.id === "languageBar") {
            
            // console.log("x", this.currentLang);
        }
        ///////////////////////////////////////////////////////////

        const existingComponent = document.querySelector(`#${this.id}`);
        if (existingComponent) {
            // existingComponent.innerHTML = this.component.innerHTML;
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
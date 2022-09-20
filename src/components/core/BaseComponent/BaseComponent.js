import langs, {checkLanguages} from "../../../localisation/langs";

class BaseComponent {
    constructor() {
        this.component = document.createElement("div");
        this.component.id = "";
        this.template = null;
        this.langs = langs;
        this.currentLang = checkLanguages();
    };

    handleLanguage() {
        
        // const language = navigator.language.toLocaleLowerCase();
        // const userLang = languagebincludes("-") ? language.split("-")[0] : language;
        // let setLang = langs[localStorage.lang] || "en";

        // for (const lang of Object.keys(langs)) {
        //     if (langs[localStorage.lang]) break;

        //     if (lang === userLang) {
        //         setLang = langs[lang];
        //         break;
        //     };
        // };

        // return setLang;
    };

    setLanguage() {
        // console.log();
    };

    animationsLoop(animations, customDelay) {
        const delay = customDelay ? customDelay : Math.ceil(1000 / 60);
        let prevTime = new Date().getTime();

        (function loop() {
            if (animations) {
                const currentTime = new Date().getTime();

                if (currentTime - prevTime > delay) {
                    prevTime = currentTime;

                    for (const animation of animations) animation();
                };
            };

            window.requestAnimationFrame(loop);
        })();
    };

    onLoad(onLoadFunctions) {
        window.onload = () => {
            for (const onLoadFunction of onLoadFunctions) onLoadFunction();
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

    render(additionalitems) {
        if (this.template) this.component.innerHTML = this.template;

        if (additionalitems) {
            for (const item of additionalitems) this.component.appendChild(item);
        };

        return this.component;
    };
};

export default BaseComponent;
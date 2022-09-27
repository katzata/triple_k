import langEn from "./en.json";
import langBg from "./bg.json";
import langIt from "./it.json";

import { langTransition } from "../utils/utils";
import { updateLocation, route } from "../router/router";

// import Header from "../components/core/Header/Header";
// import Footer from "../components/core/Footer/Footer";
// import FogCanvas from "../components/core/FogCanvas/FogCanvas";

// const fogCanvas = new FogCanvas();

const langs = {
    bg: langBg,
    en: langEn,
    it: langIt
};

export let setLanguage = "";

export const checkLanguages = () => {
    const language = navigator.language.toLocaleLowerCase();
    const userLang = language.includes("-") ? language.split("-")[0] : language;
    let setLang = langs[localStorage.lang] || langs.en;

    for (const lang of Object.keys(langs)) {
        if (langs[localStorage.lang]) {
            setLanguage = localStorage.lang;
            break;
        };

        if (lang === userLang) {
            setLang = langs[lang];
            setLanguage = lang;
            break;
        };
    };

    return setLang;
};

export const changeLanguage = (lang) => {
    if (localStorage.lang !== lang) {
        localStorage.setItem("lang", lang);
        route(langTransition);
    };
};

export default langs;
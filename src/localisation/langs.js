import langEn from "./en.json";
import langBg from "./bg.json";
import langIt from "./it.json";

import { langTransition } from "../utils/utils";
import { updateLocation, route } from "../router/router";

// const lang = "x";
// const userLang = lang.includes("-") ? lang.split("-")[0] : lang;

const langs = {
    bg: langBg,
    en: langEn,
    it: langIt
};

export let setLanguage = "";

export const setLang = () => {
    let setLang = "en";

    for (const lang of Object.keys(langs)) {
        if (langs[localStorage.lang]) {
            return localStorage.lang;
        };

        if (lang === userLang) {
            return userLang;
        };
    };

    return setLang;
};

export const checkLanguages = () => {
    const language = "";
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

export const changeLanguage = (e) => {
    const lang = e.target.textContent.toLocaleLowerCase();

    if (localStorage.lang !== lang) {
        localStorage.setItem("lang", lang);
        route(langTransition);
    };
};

export default langs;
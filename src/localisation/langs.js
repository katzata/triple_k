import langEn from "./en.json";
import langBg from "./bg.json";
import langIt from "./it.json";

import { updateLocation } from "../router/router";

const langs = {
    bg: langBg,
    en: langEn,
    it: langIt
};

export const checkLanguages = () => {
    const language = navigator.language.toLocaleLowerCase();
    const userLang = language.includes("-") ? language.split("-")[0] : language;
    let setLang = langs[localStorage.lang] || langs.en;

    for (const lang of Object.keys(langs)) {
        if (langs[localStorage.lang]) {
            // window.location.hash = localStorage.lang;
            break;
        };

        if (lang === userLang) {
            setLang = langs[lang];
            // window.location.hash = lang;
            break;
        };
    };

    return setLang;
};

export const changeLanguage = (lang) => {
    if (window.location.hash.slice(1) !== lang) {
        localStorage.setItem("lang", lang);
        window.location.hash = lang;

        updateLocation();
    };
};

export default langs;
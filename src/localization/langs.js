import langEn from "./en.json";
import langBg from "./bg.json";
import langIt from "./it.json";

// import { langTransition } from "../utils/utils";

/**
 * A list of available languages (json files).
 */
const langs = {
    bg: langBg,
    en: langEn,
    it: langIt
};

let setLanguage = "";

/**
 * Function that sets the current language from a list of available languages.
 * The check is done based on the Navigator.language property. If the value corresponds to an entry in the languagegs list it's automatically set as default.
 * The default value is "en".
 * @returns The currently set language (json object).
 */
export const checkLanguages = () => {
    const language = Navigator.language;
    const userLang = language && language.includes("-") ? language.split("-")[0] : language;
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

    if (setLanguage === "") {
        setLanguage = "en";
    };

    setLang.lang = setLanguage;
    localStorage.setItem("lang", setLanguage);
    return setLang;
};

/**
 * Function handling the language change.
 * It takes it's language value from the clicked language button.
 * Runs the route function in order to update the page section, and passes in it the langTransition callback.
 * @see router.js
 * @see utils.js
 * @param {Event} e The click event from the language buttons.
 * @param {Function} callback The route function will be passed in order to execute the language transition function.
 * @see LanguageBar
 */
export const changeLanguage = (e, routeCallback) => {
    const lang = e.target.dataset.lang;

    if (localStorage.lang !== lang) {
        localStorage.setItem("lang", lang);
        routeCallback(langTransition);
    };
};

/**
 * Callback function used to initiate page and core component transitions and updates on language change.
 * @param {Object} param0 Object containing the target section and core components (only target is used). Gets passed down from the route function.
 * @param {classInstance} page A newly created instance of a specified page.
 */
const langTransition = ({ targetSection, mainCanvas, header, footer }, page) => {
    mainCanvas.siblings = [header, targetSection, footer];
    mainCanvas.fogAnimationRunning = true;
    mainCanvas.page = page;
};

export default langs;
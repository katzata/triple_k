import BaseComponent from "../../core/BaseComponent/BaseComponent";
import mainPageTemplate from "./mainPage.hbs";
import "./mainPage.scss";

class MainPage extends BaseComponent {
    constructor() {
        super();

        this.component = document.createElement("section");
        this.template = mainPageTemplate;
        this.templateData = () => { test: this.currentLang.mainSection.test }
    };
};

export default MainPage;
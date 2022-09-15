import BaseComponent from "../../core/BaseComponent/BaseComponent";
import mainPageTemplate from "./mainPage.hbs";
import "./mainPage.scss";

class MainPage extends BaseComponent {
    constructor() {
        super();
        
        this.component = document.createElement("section");
        this.component.id = "mainPage";
        this.template = mainPageTemplate();
    };
};

export default MainPage;
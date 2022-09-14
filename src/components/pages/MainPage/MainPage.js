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

    // render() {
    //     // this.component.innerHTML = mainPageTemplate();
    //     this.component.innerHTML = this.template;

    //     return this.component;
    // };
};

export default MainPage;
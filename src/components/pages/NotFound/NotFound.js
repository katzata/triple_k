import BaseComponent from "../../core/BaseComponent/BaseComponent";
import notFoundTemplate from "./notFound.hbs";
import "./notFound.scss";

class NotFound extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("section");
        this.id = "notFound";
        this.template = notFoundTemplate;
    };
};

export default NotFound;
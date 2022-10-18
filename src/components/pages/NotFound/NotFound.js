import BaseComponent from "../../core/BaseComponent/BaseComponent";
import notFoundTemplate from "./notFound.hbs";
import "./notFound.scss";

/**
 * NotFound creates a new HTMLElement.
 * @class
 * @extends BaseComponent
 */
class NotFound extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     */
    constructor() {
        super();

        this.component = this.createElement("section");
        this.id = "notFound";
        this.template = notFoundTemplate;
    };
};

export default NotFound;
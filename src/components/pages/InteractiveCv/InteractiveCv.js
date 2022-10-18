import BaseComponent from "../../core/BaseComponent/BaseComponent";
import interactiveCvTemplate from "./interactiveCv.hbs";
import "./interactiveCv.scss";

/**
 * InteractiveCv creates a new HTMLElement.
 * @class
 * @extends BaseComponent
 */
class InteractiveCv extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     */
    constructor() {
        super();

        this.component = this.createElement("section");
        this.id = "interactiveCv";
        this.template = interactiveCvTemplate;
    };
};

export default InteractiveCv;
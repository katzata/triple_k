import BaseComponent from "../../core/BaseComponent/BaseComponent";
import interactiveCvTemplate from "./interactiveCv.hbs";
import "./interactiveCv.scss";

class InteractiveCv extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("section");
        this.id = "interactiveCv";
        this.template = interactiveCvTemplate;
        
        this.animationsLoop([
            this.test
        ]);
    };

    test() {
        console.log("yay");
    };
};

export default InteractiveCv;
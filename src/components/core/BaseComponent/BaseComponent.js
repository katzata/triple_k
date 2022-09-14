class BaseComponent {
    constructor() {
        this.component = document.createElement("div");
        this.component.id = "";
        this.template = "";
    };

    render() {
        this.component.innerHTML = this.template;
        return this.component;
    };
};

export default BaseComponent;
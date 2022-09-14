import footerTemplate from "./footer.hbs";

class Footer {
    constructor() {
        this.component = document.createElement("footer");
    };

    render(text) {
        this.component.innerHTML = footerTemplate();

        return this.component;
    };
};

export default Footer;
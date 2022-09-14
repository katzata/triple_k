import certificatesPageTemplate from "./certificatesPage.hbs";

class CertificatesPage {
    constructor() {
        this.component = document.createElement("section");
    };

    render() {
        this.component.innerHTML = certificatesPageTemplate();
        return this.component;
    };
};

export default CertificatesPage;
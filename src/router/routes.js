import MainPage from "../components/pages/mainPage/MainPage";
import CertificatesPage from "../components/pages/CertificatesPage/CertificatesPage";

// const mainPage = new MainPage();

// possibly send the .render() method directly
const routes = {
    "/": () => new MainPage(),
    "/certificates": () => new CertificatesPage()
};

export default routes;
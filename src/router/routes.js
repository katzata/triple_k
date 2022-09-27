import MainPage from "../components/pages/mainPage/MainPage";
import CertificatesPage from "../components/pages/CertificatesPage/CertificatesPage";

const routes = {
    "/": () => new MainPage(),
    "/certificates": () => new CertificatesPage()
};

export default routes;
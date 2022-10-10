import MainPage from "../components/pages/mainPage/MainPage";
import CertificatesPage from "../components/pages/CertificatesPage/CertificatesPage";
import InteractiveCv from "../components/pages/InteractiveCv/InteractiveCv";

const routes = {
    "/": () => new CertificatesPage(),
    "/certificates": () => new MainPage(),
    "/interactivecv": () => new InteractiveCv(),
};
// const routes = {
//     "/": () => new MainPage(),
//     "/certificates": () => new CertificatesPage(),
//     "/interactivecv": () => new InteractiveCv(),
// };

export default routes;
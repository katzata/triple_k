import MainPage from "../components/pages/mainPage/MainPage";
import CertificatesPage from "../components/pages/CertificatesPage/CertificatesPage";
import InteractiveCv from "../components/pages/InteractiveCv/InteractiveCv";
import Projects from "../components/pages/ProjectsPage/ProjectsPage";
import NotFound from "../components/pages/NotFound/NotFound";

/**
 * The routes for all pages.
 * Adding a route here makes it avaialable to visit.
 */
// const routes = {
//     "/": () => new CertificatesPage(),
//     "/certificates": () => new CertificatesPage(),
//     "/interactivecv": () => new InteractiveCv(),
//     "/projects": () => new Projects(),
//     "/404": () => new NotFound()
// };

const routes = {
    "/": () => new MainPage(),
    "/certificates": () => new CertificatesPage(),
    "/interactivecv": () => new InteractiveCv(),
    "/projects": () => new Projects(),
    "/404": () => new NotFound()
};

export default routes;
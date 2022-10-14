import BaseComponent from "../../core/BaseComponent/BaseComponent";
import ProjectsPageTmplate from "./projectsPage.hbs";
import "./projectsPage.scss";

class Projects extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("section");
        this.id = "projectsPage";
        this.template = ProjectsPageTmplate;
        this.templateData = () => ({ projects: this.currentLang.projectsSection });
    };
};

export default Projects;
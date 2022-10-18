import BaseComponent from "../../core/BaseComponent/BaseComponent";
import ProjectsPageTmplate from "./projectsPage.hbs";
import "./projectsPage.scss";

/**
 * Projects creates a new HTMLElement.
 * @class
 * @extends BaseComponent
 */
class Projects extends BaseComponent {
    /**
     * @see BaseComponent.component
     * @see BaseComponent.id
     * @see BaseComponent.template
     * @see BaseComponent.templateData
     */
    constructor() {
        super();

        this.component = this.createElement("section");
        this.id = "projectsPage";
        this.template = ProjectsPageTmplate;
        this.templateData = () => ({ projects: this.currentLang.projectsSection });
    };
};

export default Projects;
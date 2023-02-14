import BaseComponent from "../../core/BaseComponent/BaseComponent";
import ProjectsPageTmplate from "./projectsPage.hbs";
import singleProjectTmplate from "./singleProject.hbs";
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
        this.templateData = () => ({ title: this.currentLang.projectsSection.title });

        this.postComponentPrepFunctions = [this.handleProjects];
    };

    /**
     * Get all available projects from the portfolio.json
     */
    handleProjects = () => {
        fetch("./assets/portfolio/portfolio.json")
            .then(res => res.json())
            .catch(err => err)
            .then(projects => {
                const { lang } = this.currentLang;

                for (const project of projects) {
                    project.details = project.details[lang];
                };

                const tempDiv = this.createElement("div");
                tempDiv.innerHTML = singleProjectTmplate({ lang, projects});
                this.component.querySelector("#projectsSection").replaceChildren(...tempDiv.children);
            });
    };
};

export default Projects;
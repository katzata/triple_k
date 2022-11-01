let maskFrame = 0;

const burntPagesContent = {
    html_css: {
        title: "HTML & CSS",
        grade: "5.94/6.00",
        program: [
            {topic: "Introduction to HTML & CSS", hours: 3},
            {topic: "HTML Structure", hours: 3},
            {topic: "CSS & Typography", hours: 3},
            {topic: "CSS Box Model", hours: 3},
            {topic: "Position & Grid", hours: 3},
            {topic: "Flexbox", hours: 3},
            {topic: "Media Queries", hours: 3},
        ],
        href: "136952/fb86a6f2"
    },
    js_programming_fundamentals: {
        title: "Programming Fundamentals with JS",
        grade: "6.00/6.00",
        program: [
            {topic: "Basic Syntax, Conditional Statements and Loops", hours: 2},
            {topic: "HTTP Basics", hours: 3},
            {topic: "Data Types and Variables", hours: 3},
            {topic: "HTML & CSS Basics", hours: 3},
            {topic: "Arrays", hours: 3},
            {topic: "Software Development Concepts - Part 1", hours: 3},
            {topic: "Functions", hours: 3},
            {topic: "Software Development Concepts - Part 2", hours: 3},
            {topic: "Arrays Advanced", hours: 3},
            {topic: "Bitwise Operations", hours: 3},
            {topic: "Objects and Classes", hours: 3},
            {topic: "Associative Arrays", hours: 3},
            {topic: "Problem Solving", hours: 3},
            {topic: "Text Processing", hours: 3},
            {topic: "Database Basics", hours: 3},
            {topic: "Regular Expressions", hours: 3},
            {topic: "QA Introduction", hours: 3},
            {topic: "Git and GitHub", hours: 3},
        ],
        href: "111203/ad94f72a"
    },
    js_advanced: {
        title: "JS Advanced",
        grade: "6.00/6.00",
        program: [
            {topic: "Syntax, Functions and Statements", hours: 3},
            {topic: "Arrays and Nested Arrays", hours: 3},
            {topic: "Objects and Composition", hours: 3},
            {topic: "DOM Introduction", hours: 3},
            {topic: "DOM Manipulations and Events", hours: 3},
            {topic: "Advanced Functions", hours: 3},
            {topic: "Unit Testing and Error Handling", hours: 3},
            {topic: "Classes", hours: 3},
            {topic: "Prototypes and Inheritance", hours: 3},
            {topic: "Workshop: Interactive Application", hours: 3},
        ],
        href: "114689/d5bda82f"
    },
    js_applications: {
        title: "JS Applications",
        grade: "6.00/6.00",
        program: [
            {topic: "HTTP and REST Services", hours: 3},
            {topic: "Asynchronous Programming", hours: 3},
            {topic: "Remote Data and Authentication", hours: 3},
            {topic: "Single Page Applications", hours: 3},
            {topic: "Architecture and Testing", hours: 3},
            {topic: "Client Side Rendering", hours: 3},
            {topic: "Routing", hours: 3},
            {topic: "Modular Applications", hours: 3},
            {topic: "Workshop: End-to-End Application - Part 1", hours: 3},
            {topic: "Workshop: End-to-End Application - Part 2", hours: 3},
        ],
        href: "120795/506b082f"
    },
    js_angular: {
        title: "Angular",
        grade: "5.00/6.00",
        program: [
            {topic: "Intro to Angular and TypeScript", hours: 4},
            {topic: "Components", hours: 4},
            {topic: "DI, Intro to RxJS, Services", hours: 4},
            {topic: "Modules and Routing", hours: 4},
            {topic: "Forms", hours: 4},
            {topic: "Pipes, Interceptors and Subjects", hours: 4},
            {topic: "State Management", hours: 4},
        ],
        href: "133051/bdbbd625"
    },
    js_react: {
        title: "React",
        grade: "6.00/6.00",
        program: [
            {topic: "Intro to React and JSX", hours: 4},
            {topic: "Components: Basic Idea", hours: 4},
            {topic: "Components: Deep Dive", hours: 4},
            {topic: "Forms", hours: 4},
            {topic: "Routing", hours: 4},
            {topic: "React Hooks", hours: 4},
            {topic: "Advanced Techniques", hours: 4},
        ],
        href: "140636/5f4d1827"
    },
    programming_basics: {
        title: "Programming Basics",
        grade: "6.00/6.00",
        program: [
            {topic: "First Steps in Coding", hours: 3},
            {topic: "Conditional Statements", hours: 3},
            {topic: "Complex Conditional Statements", hours: 3},
            {topic: "Loops - part 1", hours: 3},
            {topic: "Loops - part 2", hours: 3},
            {topic: "Nested Loops", hours: 3},
        ],
        href: "104947/369412f6"
    },
    mask: {
        normal: [],
        inverted: []
    },
    burntPage: null
};

function prepareImages()  {
    const burntPage = new Image();
    burntPage.src = "../../../../assets/gfx/img/page.png";
    burntPagesContent.burntPage = burntPage;

    let images = [];

    for (let i = 0; i < 95; i += 2) {
        const image = new Image();
        image.src = `../../../../assets/gfx/img/disolve_animation/burning_paper${i}.png`;
        burntPagesContent.mask.normal.push(image);

        const imageInverted = new Image();
        imageInverted.src = `../../../../assets/gfx/img/disolve_animation_inverted/burning_paper${i}.png`;
        burntPagesContent.mask.inverted.push(imageInverted);
    };

    return images;
}

prepareImages();

// console.log(burntPagesContent.images);

export default burntPagesContent;
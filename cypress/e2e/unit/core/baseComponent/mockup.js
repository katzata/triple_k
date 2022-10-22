export const expectedProps = [
    ["component", null],
    ["id", ""],
    ["currentLang", null],
    ["template", null],
    ["templateData", null],
    ["subComponents", null],
    ["childSubComponents", null],
    ["eventHandlers", null]
];

export const expectedMethods = {
    type: Function,
    content: [
        "addChildSubComponents",
        "addSubComponents",
        "isAttached",
        "render",
        "animationsLoop",
        "createElement",
        "random",
        "addEventHandlers",
        "remove",
    ]
};

export const testElement = (className) => {
    return [
    "div",
    {
        className: `test-${className}`,
        width: "50px",
        height: "50px",
        backgroundColor: "black"
    }
]};

export const animationsLoop = {
    result: "yay",
    callback: function() {
        return this.result;
    }
};
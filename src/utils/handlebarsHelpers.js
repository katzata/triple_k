import Handlebars from "handlebars/runtime";

Handlebars.registerHelper("baseIndexes", function(sectionIndex) {
    
    // console.log("xasdasdasd", sectionIndex, sectionItems);
    // this.index = Number(sectionIndex);
    // console.log(typeof sectionIndex);
    this.baseIndexes = sectionIndex;
    // console.log(typeof this.baseIndexes);
});

let indexHolder = 0;

Handlebars.registerHelper("setIndexes", function(baseIndex, currentIndex) {
    if (baseIndex + currentIndex === 0) indexHolder = 0;
    return indexHolder++;
});

Handlebars.registerHelper("calc", function(value1, operator, value2, ceil) {
    const operations = {
        "+": value1 + value2,
        "-": value1 - value2,
        "*": value1 * value2,
        "/": value1 / value2,
        "%": value1 % value2
    };

    return ceil === true ? Math.ceil(operations[operator]) : Math.floor(operations[operator]);
});
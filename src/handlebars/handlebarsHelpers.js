import Handlebars from "handlebars/runtime";
/**
 * A handlebars helper function that simply transmits the current index as a variable.
 */
Handlebars.registerHelper("baseIndexes", function(sectionIndex) {
    this.baseIndexes = sectionIndex;
});

let indexHolder = 0;
/**
 * A handlebars helper function that increments a counter based on chunked content.
 * eg. [[a, b, c], [d, e]] will result in an index total of 4 (starts from 0 and increases after the first iteration).
 * @param {Number} baseIndex Taken from the baseIndexes helper function.
 * @param {Number} currentIndex Taken from the index of the current item (loop insite the template).
 */
Handlebars.registerHelper("setIndexes", function(baseIndex, currentIndex) {
    if (baseIndex + currentIndex === 0) indexHolder = 0;
    return indexHolder++;
});

/**
 * A handlebars helper function that makes all caps trom a specific text.
 */
Handlebars.registerHelper("capialiseAll", function(text) {
    return text.toLocaleUpperCase();
});

Handlebars.registerHelper("certificateClass", function(certificate) {
    return certificate.slice(certificate.length - 2);
});

Handlebars.registerHelper("offsetTextY", function(baseY, i, increment) {
    return baseY + (i * increment);
});

Handlebars.registerHelper("pageIndex", function(elementIndex) {
    // console.log(elementIndex * 2);
    return elementIndex * 2;
});

// Handlebars.registerHelper("calc", function(value1, operator, value2) {
//     value1 = parseFloat(value1);
//     value2 = parseFloat(value2);
        
//     return {
//         "+": value1 + value2,
//         "-": value1 - value2,
//         "*": value1 * value2,
//         "/": value1 / value2,
//         "%": value1 % value2
//     }[operator];
// });
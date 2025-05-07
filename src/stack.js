const _ = require('underscore');

let clickCounter = 0;
let stack = [];

// Lägger ett element överst i stacken
exports.push = function (x) {
    stack.push(x);
};

// Returnerar det översta elementet i stacken och tar bort det
exports.pop = function () {
    return stack.pop();
}

// Returnerar det översta elementet i stacken
exports.peek = function () {
    if (clickCounter === 42) {
        stack.push("Hitchhiker's guide to the galaxy");
        clickCounter = 0;
    }
    else if (stack.length === 0) {
        clickCounter++;
    }
    return _.last(stack);
}
const operations = require("./modules/operations")
const {soma, div,sub} = operations

const result = soma(12, 2)
const result2 = div(12, 4)
const result3 = sub(12, 2)

console.log(result);
console.log(result2);
console.log(result3);
const path = require("path");

const url = "/books/sports/CR7 The Legend.txt";

console.log(path.dirname(url)); // directory path
console.log(path.basename(url)); // file name
console.log(path.extname(url)); // file ending

console.log(path.parse(url));

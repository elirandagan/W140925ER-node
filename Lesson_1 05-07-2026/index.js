// console.log("directory name (father): ", __dirname);
// console.log("file name (child): ", __filename);
// console.log(global);

const Person = require("./custom-modules/my-module");

const fullName = require("./custom-modules/my-module2");
const { firstName, lastName, y } = require("./custom-modules/my-module2");

const person = new Person("Eliran");
console.log(person.sayHello());

// console.log(`First Name: ${fullName.firstName}`);
console.log(`First Name: ${firstName}`);
// console.log(`Last Name: ${fullName.lastName}`);
console.log(`Last Name: ${lastName}`);

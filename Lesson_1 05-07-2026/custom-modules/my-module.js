class Person {
  name;

  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello from ${this.name}`;
  }
}

// export default Person // module
module.exports = Person; // commonJs

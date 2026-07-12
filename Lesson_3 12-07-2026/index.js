// const http = require("http")
const express = require("express");
const path = require("path");

// const server = http.createServer();
const app = express();
app.use(express.json()); // Support requests with json data - in req.body

// server.on("request", (req, res) => {
//   if (req.url == "/") {
//     return res.end("Welcome to Express.js!");
//   }
// });

// DB
const users = [
  { firstName: "Israel", lastName: "Israeli" },
  { firstName: "Israel1", lastName: "Israeli1" },
  { firstName: "Ploni", lastName: "Almoni" },
  { firstName: "Ploni", lastName: "Almoni2" },
];

app.get("/", (req, res) => {
  res.end("Welcome to Express.js!");
});

app.get("/home", (req, res) => {
  res.end("Welcome to Home");
});

app.get("/about", (req, res) => {
  res.end("Welcome to About");
});

app.get("/cards", (req, res) => {
  res.end("Welcome to Cards");
});

app.get("/users", (req, res) => {
  // res.end(JSON.stringify(users))
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser) {
    users.push(newUser);
    return res.json({ msg: "User saved", user: newUser });
  }

  res.json({ msg: "Failed to save new user" });
});

// http://localhost:8000/search?firstName=ploni
app.get("/search", (req, res) => {
  const { firstName } = req.query;

  const filtered = users.filter(
    (user) =>
      user.firstName.toLocaleLowerCase() == firstName?.toLocaleLowerCase(),
  );

  return res.json(filtered);
});

app.get("/file", (req, res) => {
  const filePath = path.resolve("exmple.html");
  res.sendFile(filePath);
});

// server.listen(8000)
app.listen(8000);

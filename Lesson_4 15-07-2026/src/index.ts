// const express = require("express");
import express from "express";
// const path = require("path"); // Works only in common.js
// const usersRouter = require("./routes/users");
import usersRouter from "./routes/users.ts";
// const logger = require("./middleware/logger");
import logger from "./middleware/logger.ts";
// const notFound = require("./middleware/not-found");
import notFound from "./middleware/not-found.ts";

const app = express();
app.use(express.json());

// http://localhost:8000/static
// app.use("/static", express.static(path.resolve("public"))); // // Works only in common.js

app.use(logger);

// http://localhost:8000/api/users
app.use("/api/users", usersRouter);

app.use(notFound);

app.listen(8000);
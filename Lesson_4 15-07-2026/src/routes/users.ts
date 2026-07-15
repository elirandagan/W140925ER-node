// const { Router } = require("express");
import { Router } from "express";

const usersRouter = Router();

// GET http://localhost:8000/api/users/
usersRouter.get("/", (req, res) => {
  res.json({
    users: [{ name: "user1" }, { name: "user2" }, { name: "user3" }],
  });
});

// GET http://localhost:8000/api/users/test
usersRouter.get("/test", (req, res) => {
  res.json({
    test: "test",
  });
});

// module.exports = usersRouter;
export default usersRouter;

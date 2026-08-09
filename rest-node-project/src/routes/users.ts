import { Router } from "express";
import userService from "../services/user-service.ts";
import { validateLogin, validateUser } from "../middleware/validate.ts";

const router = Router();

// POST http:localhost:3000/api/v1/users/login
router.post("/login", validateLogin, async (req, res) => {
  const token = await userService.login(req.body.email, req.body.password);

  res.json({ message: "Logged in!", token });
});

// POST http:localhost:3000/api/v1/users
router.post("/", validateUser, async (req, res) => {
  const userResponse = await userService.createUser(req.body);

  res.status(201).json({ message: "User Saved!", user: userResponse });
});

// GET http:localhost:3000/api/v1/users
router.get("/", async (req, res) => {
  const users = await userService.getUsers();

  res.json({ users });
});

export default router;

import { Router } from "express";
import { userSchema } from "../validations/user.ts";
import { loginSchema } from "../validations/login.ts";
import userService from "../services/user-service.ts";

const router = Router();

// POST http:localhost:3000/api/v1/users/login
router.post("/login", async (req, res) => {
  const { email, password } = await loginSchema.parseAsync(req.body);

  const token = await userService.login(email, password);

  res.json({ message: "Logged in!", token });
});

// POST http:localhost:3000/api/v1/users
router.post("/", async (req, res) => {
  const userRequest = await userSchema.parseAsync(req.body);

  const userResponse = await userService.createUser(userRequest);

  res.status(201).json({ message: "User Saved!", user: userResponse });
});

// GET http:localhost:3000/api/v1/users
router.get("/", async (req, res) => {
  const users = await userService.getUsers();

  res.json({ users });
});

export default router;

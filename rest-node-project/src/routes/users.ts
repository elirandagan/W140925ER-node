import { Router } from "express";
import { UserModel } from "../database/models.ts";

const router = Router();

// POST http:localhost:3000/api/v1/users
router.post("/", async (req, res) => {
  // TODO: Check validation using zod schemas
  const userBody = req.body;

  // Create Instance of User using UserModel
  const user = new UserModel(userBody);

  // MongoDB - save/create the user
  const savedUser = await user.save();

  res.status(201).json({ message: "User Saved!", user: savedUser });
});

// GET http:localhost:3000/api/v1/users
router.get("/", async (req, res) => {
  const users = await UserModel.find();

  res.json({ users });
});

export default router;

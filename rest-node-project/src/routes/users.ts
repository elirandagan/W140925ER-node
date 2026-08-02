import { Router } from "express";
import { UserModel } from "../database/models.ts";
import { userSchema } from "../validations/user.ts";
import bcrypt from "bcrypt";
import { loginSchema } from "../validations/login.ts";

const router = Router();

router.post("/login", async (req, res) => {
  // Validate body request
  const { email, password } = await loginSchema.parseAsync(req.body);

  // Check if user exist
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Login Failed - cannot find user email",
    });
  }

  // Check if the password is correct
  // password - the password from the client
  // user.password - the encrypted password saved on the user in the DB
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Login Failed - incorect password",
    });
  }

  // TODO: Create JWT

  res.json({ message: "Logged in!" });
});

// POST http:localhost:3000/api/v1/users
router.post("/", async (req, res) => {
  const userBody = req.body;

  // Validation on the request body
  await userSchema.parseAsync(userBody);

  // Create Instance of User using UserModel
  const user = new UserModel(userBody);

  user.password = await bcrypt.hash(user.password, 12);

  // MongoDB - save/create the user
  const savedUser = await user.save();
  const { password, ...userWithoutPassword } = savedUser.toObject();

  res.status(201).json({ message: "User Saved!", user: userWithoutPassword });
});

// GET http:localhost:3000/api/v1/users
router.get("/", async (req, res) => {
  const users = await UserModel.find();

  res.json({ users });
});

export default router;

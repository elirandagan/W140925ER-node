import { Router } from "express";

const router = Router();

// GET http:localhost:8000/api/v1/users
router.get("/", (req, res) => {
  res.json({ route: "users" });
});

export default router;

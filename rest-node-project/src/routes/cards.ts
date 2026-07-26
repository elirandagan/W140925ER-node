import { Router } from "express";

const router = Router();

// GET http:localhost:8000/api/v1/cards
router.get("/", (req, res) => {
  res.json({ route: "cards" });
});

export default router;

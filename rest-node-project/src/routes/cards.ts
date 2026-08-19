import { Router } from "express";
import { validateCard } from "../middleware/validate.ts";
import { isBusiness } from "../middleware/is-business.ts";
import cardService from "../services/card-service.ts";
import validateToken from "../middleware/validate-token.ts";

const router = Router();

// POST http://localhost:3000/api/v1/cards
router.post("/", validateCard, ...isBusiness, async (req, res) => {
  const userId = req.user?._id as unknown as string;
  const userData = req.body;

  const card = await cardService.createCard(userData, userId);

  res.json({ card });
});

// GET http://localhost:3000/api/v1/cards
router.get("/", async (req, res) => {
  const cards = await cardService.getCards();

  res.json({ cards });
});

// GET http://localhost:3000/api/v1/cards/my-cards
router.get("/my-cards", validateToken, async (req, res) => {
  console.log(req.user?._id);
  const userId = req.user?._id.toString();

  const myCards = await cardService.getMyCards(userId);

  res.json({ myCards });
});

// GET http://localhost:3000/api/v1/cards/{id}
router.get("/:id", async (req, res) => {
  const card = await cardService.getCard(req.params.id as string);

  res.json({ card });
});

export default router;

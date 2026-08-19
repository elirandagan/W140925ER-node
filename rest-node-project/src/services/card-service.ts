import { type Card as CardRequest } from "../validations/card.ts";
import { CardModel } from "../database/models.ts";
import { logger } from "../logs/logger.ts";
import { NotFoundError } from "../error/custom-error.ts";

const cardService = {
  getCards: async () => {
    const cards = await CardModel.find();

    return cards;
  },
  getCard: async (cardId: string) => {
    const card = await CardModel.findById(cardId);
    if (!card) {
      logger.error("[getCard]: No such card found");
      throw new NotFoundError("No such card found");
    }

    return card;
  },
  getMyCards: async (userId: string) => {
    console.log(userId);
    const cards = await CardModel.find({ userId });

    return cards;
  },
  createCard: async (cardData: CardRequest, userId: string) => {
    const card = new CardModel(cardData);

    card.userId = userId;

    // can be used with moduels like uuid() instead
    while (true) {
      const random = Math.floor(Math.random() * 1_000_000);
      const dbRes = await CardModel.findOne({ bizNumber: random });
      if (!dbRes) {
        card.bizNumber = random;
        break;
      }
    }

    const savedCard = await card.save();
    return savedCard;
  },
};

export default cardService;

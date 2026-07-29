import mongoose from "mongoose";
import { userDBSchema } from "./schemas/user.ts";
import { cardDBSchema } from "./schemas/card.ts";

const UserModel = mongoose.model("User", userDBSchema);
const CardModel = mongoose.model("Card", cardDBSchema);

export { UserModel, CardModel };

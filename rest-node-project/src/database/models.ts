import mongoose from "mongoose";
import { DBUser, IUserModel, userDBSchema } from "./schemas/user.ts";
import { cardDBSchema } from "./schemas/card.ts";
import authService from "../services/auth-service.ts";

// Method For Document
// this equals to the Document instance
userDBSchema.methods.setPassword = async function (password: string) {
  console.log("Setting Password for user: ", this.email);
  this.password = await authService.hashPassword(password);
  return this.save();
};

// Method For Collection
// this equals to the collection itself
userDBSchema.statics.findByEmail = async function (email: string) {
  console.log("Find user using email: ", email);
  return this.findOne({ email });
};

const UserModel = mongoose.model<DBUser, IUserModel>("User", userDBSchema);
const CardModel = mongoose.model("Card", cardDBSchema);

export { UserModel, CardModel };

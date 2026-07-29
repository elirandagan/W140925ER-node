import { Schema } from "mongoose";
import { type User } from "../../validations/user.ts";
import { nameDBSchema } from "./name.ts";
import { addressDBSchema } from "./address.ts";
import { imageDBSchema } from "./image.ts";

export type DBUser = User & {
  isAdmin?: boolean;
  createdAt?: Date;
  _id: unknown;
};

export const userDBSchema = new Schema<DBUser>({
  name: { type: nameDBSchema, required: true },
  address: { type: addressDBSchema, required: true },
  image: {
    type: imageDBSchema,
    required: false,
    default: {
      alt: "user-profile",
      url: "https://picsum.photos/200/300",
    },
  },
  phone: {
    type: String,
    minlength: 9,
    maxlength: 15,
    required: true,
  },
  email: {
    type: String,
    minlength: 7,
    maxlength: 20,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 7,
    select: false,
    maxlength: 100,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

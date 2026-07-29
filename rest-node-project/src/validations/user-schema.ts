import { z } from "zod/v4";
import { addressSchema } from "./address-schema";
import { nameSchema } from "./name-schema";
import { passwordRegex, phoneRegex } from "./patterns";
import { imageSchema } from "./image-schema";

export const userSchema = z.strictObject({
  address: addressSchema,
  email: z.email().min(5).max(250),
  name: nameSchema,
  password: z.string().min(6).max(30).regex(passwordRegex),
  phone: z.string().min(8).max(12).regex(phoneRegex),
  image: imageSchema,
  isBussiness: z.boolean(),
});

export type User = z.infer<typeof userSchema>;

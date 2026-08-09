import { type RequestHandler } from "express";
import { type ZodType } from "zod/v4";
import { userSchema } from "../validations/user.ts";
import { loginSchema } from "../validations/login.ts";

// Generic validator middlware for client-schema
export function validateSchema<T>(
  schema: ZodType<T>,
): RequestHandler<any, any, T> {
  return async (req, res, next) => {
    req.body = await schema.parseAsync(req.body);
    next();
  };
}

// Export ready-to-use validators middleware

// const validateUser2 = (): RequestHandler => {
//   return async (req, res, next) => {
//     req.body = await userSchema.parseAsync(req.body);
//     next();
//   };
// };

export const validateUser = validateSchema(userSchema);

// const validateLogin2 = (): RequestHandler => {
//   return async (req, res, next) => {
//     req.body = await loginSchema.parseAsync(req.body);
//     next();
//   };
// };
export const validateLogin = validateSchema(loginSchema);

/*
function returnArr<T>(item: T): () => T[] {
  return function () {
    return [item];
  };
}

const convertToArrOfNumber = returnArr(10);
const arrOfNumber = convertToArrOfNumber(); // [10]
*/

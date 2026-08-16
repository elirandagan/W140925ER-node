import { type User as UserRequest } from "../validations/user.ts";
import { UserModel } from "../database/models.ts";
import { HttpError, NotFoundError } from "../error/custom-error.ts";
import authService from "./auth-service.ts";
import { logger } from "../logs/logger.ts";

const userService = {
  createUser: async (userData: UserRequest) => {
    const userExist = await UserModel.findByEmail(userData.email);
    // ive made it using findByEMail - debug
    if (userExist) {
      logger.error("[createUser]: The email is aleardy taken");
      throw new HttpError("The email is aleardy taken", 400);
    }

    const user = new UserModel(userData);
    await user.setPassword(userData.password);

    const { password, ...userWithourPassword } = (await user.save()).toObject();
    logger.info("[createUser]: return success user without password");
    return userWithourPassword;
  },
  getUsers: async () => {
    const users = await UserModel.find({}, { password: 0 });
    logger.info("[getUsers]: Return all users");
    return users;
  },
  getUser: async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) {
      logger.error("[getUser]: No such user found");
      throw new NotFoundError("No such user found");
    }

    logger.info("[getUser]: Return user succesfully");
    return user;
  },
  updateUser: async (id: string, userData: Partial<UserRequest>) => {
    const user = await UserModel.findByIdAndUpdate({ _id: id }, userData, {
      new: true,
    });

    if (!user) {
      logger.error("[updateUser]: No such user found");
      throw new NotFoundError("No such user found");
    }

    logger.info("[updateUser]: Update user succesfully - Return user");
    return user;
  },
  deleteUser: async (id: string) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      logger.error("[deleteUser]: No such user found");
      throw new NotFoundError("No such user found");
    }

    logger.info("[deleteUser]: Delete user succesfully - Return user");
    return user;
  },
  login: async (email: string, password: string) => {
    // Check if user exist
    const user = await UserModel.findOne(
      { email },
      { password: 1, email: 1, isAdmin: 1 },
    );

    if (!user) {
      logger.error("[login]: Login Failed - cannot find user email");
      throw new HttpError("Login Failed - cannot find user email", 400);
    }

    // Check if the password is correct
    // password - the password from the client
    // user.password - the encrypted password saved on the user in the DB
    const isPasswordValid = await authService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      logger.error("[login]: Login Failed - incorect password");
      throw new HttpError("Login Failed - incorect password", 400);
    }

    const token = authService.generateJWT({
      email: user.email,
      isAdmin: user.isAdmin ?? false,
    });

    logger.info("[login]: Login succesfully - Return valid token for user");
    return token;
  },
};

export default userService;

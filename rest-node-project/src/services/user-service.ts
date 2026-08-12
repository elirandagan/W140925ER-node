import { type User as UserRequest } from "../validations/user.ts";
import { UserModel } from "../database/models.ts";
import { HttpError, NotFoundError } from "../error/custom-error.ts";
import authService from "./auth-service.ts";

const userService = {
  createUser: async (userData: UserRequest) => {
    const userExist = await UserModel.findByEmail(userData.email);
    if (userExist) {
      throw new HttpError("The email is aleardy taken", 400);
    }

    const user = new UserModel(userData);
    await user.setPassword(userData.password);

    const { password, ...userWithourPassword } = (await user.save()).toObject();
    return userWithourPassword;
  },
  getUsers: async () => {
    return await UserModel.find({}, { password: 0 });
  },
  getUser: async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFoundError("No such user found");
    }

    return user;
  },
  updateUser: async (id: string, userData: Partial<UserRequest>) => {
    const user = await UserModel.findByIdAndUpdate({ _id: id }, userData, {
      new: true,
    });

    if (!user) {
      throw new NotFoundError("No such user found");
    }
    return user;
  },
  login: async (email: string, password: string) => {
    // Check if user exist
    const user = await UserModel.findOne(
      { email },
      { password: 1, email: 1, isAdmin: 1 },
    );

    if (!user) {
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
      throw new HttpError("Login Failed - incorect password", 400);
    }

    return authService.generateJWT({
      email: user.email,
      isAdmin: user.isAdmin ?? false,
    });
  },
};

export default userService;

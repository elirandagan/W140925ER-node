import chalk from "chalk";
// import { Request, Response, NextFunction } from "express";
import { type RequestHandler } from "express";

// const logger = (req: Request, res: Response, next: NextFunction) => {
const logger: RequestHandler = (req, res, next) => {
  console.log(chalk.blue(req.method, req.url));

  next();
};

// module.exports = logger;
export default logger;

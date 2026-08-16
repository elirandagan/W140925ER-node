import env from "../config/index.ts";
import { logger } from "../logs/logger.ts";

const initDB = async () => {
  if (env.NODE_ENV !== "production") {
    logger.info("Intilizing Database...");
    // TODO: Add some users
    // TODO: Add some cards
    logger.info("Database initialized successfully");
  }
};

export default initDB;

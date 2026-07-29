import env from "../config/index.ts";

const initDB = async () => {
  if (env.NODE_ENV !== "production") {
    console.log("Intilizing Database...");
    // TODO: Add some users
    // TODO: Add some cards
    console.log("Database initialized successfully");
  }
};

export default initDB;

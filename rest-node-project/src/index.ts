import env from "./config/index.ts";
import express from "express";
import notFound from "./middleware/not-found.ts";
import usersRouter from "./routes/users.ts";
import cardsRouter from "./routes/cards.ts";
import connectDB from "./database/connect.ts";
import { errorHandler } from "./middleware/error-handler.ts";
// import morgan from "morgan";
import { httpLogger, logger } from "./logs/logger.ts";

connectDB();

const app = express();

// Request logger
// app.use(morgan("[:method]: :url , :status - :response-time ms"));
app.use(httpLogger);

// Middleware body parse
app.use(express.json());

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(notFound);
app.use(errorHandler);

const { PORT } = env;

app.listen(PORT, () => {
  logger.info(`Server runs on: http://localhost:${PORT}`);
});

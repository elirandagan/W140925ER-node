import env from "./config/index.ts";
import express from "express";
import notFound from "./middleware/not-found.ts";
import usersRouter from "./routes/users.ts";
import cardsRouter from "./routes/cards.ts";
import connectDB from "./database/connect.ts";

connectDB();

const app = express();

// Middleware body parse
app.use(express.json());

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(notFound);

const { PORT } = env;

app.listen(PORT, () => {
  console.log(`Server runs on: http://localhost:${PORT}`);
});

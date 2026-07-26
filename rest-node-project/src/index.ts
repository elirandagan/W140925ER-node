import express from "express";
import notFound from "./middleware/not-found.ts";
import usersRouter from "./routes/users.ts";
import cardsRouter from "./routes/cards.ts";

const app = express();

// Middleware body parse
app.use(express.json());

// Routes
// http:localhost:8000/api/v1/users
app.use("/api/v1/users", usersRouter);
// http:localhost:8000/api/v1/cards
app.use("/api/v1/cards", cardsRouter);
app.use(notFound);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server runs on: http://localhost:${PORT}`);
});

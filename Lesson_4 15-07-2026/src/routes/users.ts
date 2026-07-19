import { type Request, type Response, Router } from "express";
import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  // host, port, user, password, database
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "eshops",
  multipleStatements: false, // By default false
});

const usersRouter = Router();

// GET http://localhost:8000/api/users/
usersRouter.get("/", (req: Request, res: Response) => {
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// GET http://localhost:8000/api/users/test
usersRouter.get("/test", (req, res) => {
  res.json({
    test: "test",
  });
});

// POST http://localhost:8000/api/users
usersRouter.post("/", (req: Request, res: Response) => {
  const { username, email } = req.body;

  // const sqlQuery = `INSERT INTO users (username,email) VALUES (${username}, ${email})`;

  // connection.query(sqlQuery, (err, result) => {
  //   if (err) console.error(err);
  //   else console.log("Success!", result);
  // });

  const sqlQuery = `INSERT INTO users(
                    username, email
                    )
                    VALUES (? , ?)`;

  const values = [username, email];

  connection.execute(sqlQuery, values, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
      console.log("Success!", result);
    }
  });
});

// module.exports = usersRouter;
export default usersRouter;

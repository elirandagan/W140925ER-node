const http = require("http");
const router = require("./routes/router");
const logger = require("./middleware/logger");

// הגדרת פעולות שיקרון כתוצאה מהאזנה לבקשות
const server = http.createServer();

server.on("request", logger);
server.on("request", router);

console.log("Listening on adress - http://localhost:3000");

// הגדרת הכתובת האזנה של השרת
// Base URL - http://localhost:3000
server.listen(3000);

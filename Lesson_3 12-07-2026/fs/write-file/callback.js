const fs = require("fs");
const path = require("path");

// ניתוב
const filePath = path.resolve("logs/logger.txt");

// תוכן
const content = "This is my second log";

// כתיבה לקובץ
fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File written successfully");
  }
});

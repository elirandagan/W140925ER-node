const fs = require("fs/promises");
const path = require("path");

// ניתוב
const filePath = path.resolve("logs/logger.txt");

// תוכן
const content = "This is my log from async-await";

const writeToFileAsync = async () => {
  try {
    await fs.writeFile(filePath, content);
  } catch (error) {
    console.error(err);
  }
};

writeToFileAsync();

const fs = require("fs/promises");
const path = require("path");

const filePath = path.resolve("logs/logger.txt");

const readFromFileAsync = async () => {
  try {
    const content = await fs.readFile(filePath, { encoding: "utf8" });
    console.log(content);
  } catch (error) {
    console.error(error);
  }
};

readFromFileAsync();

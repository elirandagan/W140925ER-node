const fs = require("fs/promises");
const path = require("path");
const { EOL } = require("os"); // shorcut - End-Of-Line - break row

const filePath = path.resolve("logs/logger2.txt");

const content = `This is NEW CONTENT!${EOL}`;

const appendToFileAsync = async () => {
  try {
    await fs.appendFile(filePath, content);
  } catch (error) {
    console.error(error);
  }
};

appendToFileAsync();

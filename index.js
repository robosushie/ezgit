const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const { execSync } = require("child_process");

const verifyPathExists = (pathname) => {
  return fs.existsSync(pathname);
};

const run = (command) => {
  return execSync(command, { encoding: "utf-8" });
};

module.exports = { verifyPathExists };

#! /usr/bin/env node
const dotenv = require("dotenv");
const yargs = require("yargs");
const {
  verifyPathExists,
  run,
  generateCommitMessage,
  getGPTVersion,
  refactorCode,
  extractJSX,
} = require("../index");
const { default_ezgit_config } = require("../constants");
const fs = require("fs");
const path = require("path");

dotenv.config();
dotenv.config({ path: ".env.local" });

const args = yargs.argv._;
const command = args[0];
const gpt_version = yargs.argv.gptv;
const file_path = yargs.argv.path;
console.log(args, file_path);

const rootDirectory = process.cwd();

const initHandler = async () => {
  if (args.length > 1) {
    console.error("Too many arguments provided.");
    return;
  }
  if (!verifyPathExists("package.json")) {
    console.error(
      "Cannot find 'package.json'. Ensure you're in a Node.js project directory."
    );
    return;
  }
  if (verifyPathExists("ezgit.config.js")) {
    console.info("Initialization for 'ezgit' already completed.");
    return;
  }
  console.log("Initializing 'ezgit'...");
  fs.writeFile("ezgit.config.js", default_ezgit_config, (error) => {
    if (error) {
      console.error("Failed to create the config file due to an error.");
      throw error;
    }
    console.log("Successfully created the config file.");
  });
};

const commitHandler = async () => {
  if (!verifyPathExists("ezgit.config.js")) {
    console.error(
      "Cannot find 'ezgit.config.js'. Ensure 'ezgit' is initialized in project directory."
    );
    return;
  }

  const config = require(`${rootDirectory}/ezgit.config.js`);
  config["gpt-version"] = getGPTVersion(gpt_version);

  run(`git add .`);

  const excludeList = config["exclude-file-list"];
  const excludeCmd = excludeList.map((item) => `:(exclude)` + item + ``);
  const diff = run(`git diff --staged -- . ${excludeCmd.join(" ")}`);
  // console.log(diff);

  const message = await generateCommitMessage(config, diff);
  console.log(message);

  run(`git commit -m "${message}"`);
};

const refactorHandler = async () => {
  if (!verifyPathExists("ezgit.config.js")) {
    console.error(
      "Cannot find 'ezgit.config.js'. Ensure 'ezgit' is initialized in project directory."
    );
    return;
  }

  if (!verifyPathExists(file_path)) {
    console.error(`Cannot find ${file_path}. Ensure the file path exists.`);
    return;
  }

  const config = require(`${rootDirectory}/ezgit.config.js`);
  let file_content = fs.readFileSync(file_path, "utf8");
  // console.log(file_content);
  file_content = await refactorCode(config, file_content);
  // console.log(file_content);
  file_content = extractJSX(file_content);
  if (file_content) {
    fs.writeFileSync(file_path, file_content, "utf8");
  } else {
    console.log("Unable to refactor properly !!");
  }
};

const defaultHandler = async () => {
  if (!verifyPathExists("ezgit.config.js")) {
    console.error(
      "Cannot find 'ezgit.config.js'. Ensure 'ezgit' is initialized in project directory."
    );
    return;
  }

  run(`git ${args.join(" ")}`);
};

if (command === "init") {
  initHandler();
} else if (command === "commit") {
  commitHandler();
} else if (command === "refactor") {
  refactorHandler();
} else {
  defaultHandler();
}

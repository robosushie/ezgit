#! /usr/bin/env node
const dotenv = require("dotenv");
const yargs = require("yargs");
const { verifyPathExists, run, generateCommitMessage } = require("../index");
const { default_ezgit_config } = require("../constants");
const fs = require("fs");
const path = require("path");

dotenv.config();
dotenv.config({ path: ".env.local" });

const args = yargs.argv._;
const command = args[0];

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

  run(`git add .`);

  const excludeList = config["exclude-file-list"];
  const excludeCmd = excludeList.map((item) => `:(exclude)` + item + ``);
  const diff = run(`git diff --staged -- . ${excludeCmd.join(" ")}`);
  // console.log(diff);

  const message = await generateCommitMessage(config, diff);
  console.log(message);

  run(`git commit -m "${message}"`);
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
} else {
  defaultHandler();
}

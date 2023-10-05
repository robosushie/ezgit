#! /usr/bin/env node
const dotenv = require("dotenv");
const yargs = require("yargs");
const ezgit = require("../index");
const { default_ezgit_config } = require("../constants");
const fs = require("fs");
const path = require("path");

dotenv.config();
dotenv.config({ path: ".env.local" });

const args = yargs.argv._;
const command = args[0];

const rootDirectory = path.join(__dirname, "..");

if (command === "init") {
  if (args.length > 1) {
    console.error("Too many arguments provided.");
    return;
  }
  if (!ezgit.verifyPathExists("package.json")) {
    console.error(
      "Cannot find 'package.json'. Ensure you're in a Node.js project directory."
    );
    return;
  }
  if (ezgit.verifyPathExists("ezgit.config.js")) {
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
} else if (command === "start") {
} else {
  if (!ezgit.verifyPathExists("ezgit.config.js")) {
    console.error(
      "Cannot find 'ezgit.config.js'. Ensure 'ezgit' is initialized in project directory."
    );
    return;
  }

  // const config = require(`${rootDirectory}/ezgit.config.js`);
  // const commands = config.commands;
  // if (!(command in commands)) {
  //   console.error(
  //     `Invalid command - ${command} does not exist in commands list`
  //   );
  // }

  // Run the commands
}

const default_ezgit_config = `const dotenv = require("dotenv");

dotenv.config();
dotenv.config({ path: ".env.local" });

module.exports = {
  "exclude-file-list": ["package.json", "package-lock.json"],
  "openai-api-key": process.env.OPENAI_API_KEY,
  "gpt-version": "gpt-3.5-turbo",

  prompts:{
    commit: {
      system: "As a professional software developer working on a scale project, it's crucial to write clear and detailed commit messages for every change. A good commit message provides context about the change, the reason for the change, and any other relevant details.",
      user:"Using the following diff, write a short commit message with a short title and points - ",
    },
  },

  commands: {
    // you can add custom commands here
  },
}`;

module.exports = { default_ezgit_config };

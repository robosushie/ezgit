const default_ezgit_config = `const dotenv = require("dotenv");

dotenv.config();
dotenv.config({ path: ".env.local" });

module.exports = {
  "exclude-file-list": ["package.json", "package-lock.json"],
  "openai-api-key": process.env.OPENAI_API_KEY,
  "gpt-version": "gpt-3.5-turbo",

  prompts:{
    commit: {
      user:"Write a short commit message using the following diff ",
    },
    refactor: {
      user:"Refactor the code \n",
    },
  },

  commands: {
    // you can add custom commands here
  },
}`;

module.exports = { default_ezgit_config };

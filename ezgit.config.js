const dotenv = require("dotenv");

dotenv.config();
dotenv.config({ path: ".env.local" });

module.exports = {
  "exclude-file-list": ["package.json", "package-lock.json"],
  "openai-api-key": process.env.OPENAI_API_KEY,

  prompts: {
    commit: {
      system:
        "As a professional software developer working on a scale project.",
      user: "Using the following diff, write professional commit message in points - ",
    },
  },

  commands: {
    // you can add custom commands here
  },
};

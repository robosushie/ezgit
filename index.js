const { OpenAI } = require("openai");
const fs = require("fs");
const { execSync } = require("child_process");

const verifyPathExists = (pathname) => {
  return fs.existsSync(pathname);
};

const run = (command) => {
  return execSync(command, { encoding: "utf-8" });
};

const getGPTVersion = (gpt_version) => {
  if (gpt_version == "gpt-4") {
    return "gpt-4";
  } else {
    return "gpt-3.5-turbo";
  }
};

const generateCommitMessage = async (config, diff, gpt_version) => {
  if (!config["openai-api-key"]) {
    console.error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
    return;
  }
  const openai = new OpenAI({ apiKey: config["openai-api-key"] });

  const response = await openai.chat.completions.create({
    messages: [
      { role: `system`, content: config.prompts.commit.system },
      { role: "user", content: `${config.prompts.commit.user} ${diff}` },
    ],
    model: getGPTVersion(gpt_version),
  });
  return response.choices[0].message.content;
};

module.exports = { verifyPathExists, run, generateCommitMessage };

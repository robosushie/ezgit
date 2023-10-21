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
  } else if (gpt_version == "gpt-3.5-turbo") {
    return "gpt-3.5-turbo";
  } else {
    return config["gpt-version"];
  }
};

const extractJSX = (text) => {
  const regex = /```.*?\n/g;
  // console.log(text);
  const delimiters = regex.exec(text);
  // console.log(text, delimiters);

  if (delimiters) {
    text = text.split(delimiters[0])[1];
    text = text.split("```")[0];
    return text;
  }
  return "";
};

const refactorCode = async (config, file_content) => {
  if (!config["openai-api-key"]) {
    console.error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
    return;
  }
  const openai = new OpenAI({ apiKey: config["openai-api-key"] });

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${config.prompts.refactor.user} ${file_content}`,
      },
    ],
    model: config["gpt-version"],
  });

  return response.choices[0].message.content;
};

const generateCommitMessage = async (config, diff) => {
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
    model: config["gpt-version"],
  });
  return response.choices[0].message.content;
};

module.exports = {
  verifyPathExists,
  run,
  generateCommitMessage,
  getGPTVersion,
  refactorCode,
  extractJSX,
};

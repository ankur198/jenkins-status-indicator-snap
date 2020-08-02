const fs = require("fs");
const load = () => {
  try {
    const configs = fs.readFileSync(
      "~/.jenkins-status-indicator/config",
      "utf-8"
    );
  } catch (error) {
    return null;
  }
};

const prompt_cli = () => {
  return new Promise((res) => {
    const inquirer = require("inquirer");
    inquirer
      .prompt([
        {
          message: "Where is your jenkins server located?",
          default: "http://localhost:8080",
          name: "url",
        },
        {
          message: "Username",
          name: "username",
        },
        {
          message: "Password",
          name: "password",
          type: "password",
        },
      ])
      .then((answers) => res(answers));
  });
};

module.exports = {
  load,
  prompt_cli,
};

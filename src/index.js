#!/usr/bin/env node

const configManager = require("./configManager");
const ora = require("ora");

if (!configManager.load() && false) {
  configManager.prompt().then((answers) => {
    const spinner = ora("connecting...").start();
    const jenkins = require("jenkins")({
      baseUrl: "http://ankur:asd@localhost:8080",
      crumbIssuer: true,
    });
    jenkins.build.get("10secbuild", "lastBuild", function (err, data) {
      if (err) {
        spinner.fail(err.message);
      } else {
        // console.log('info', data);
        spinner.succeed("connected");
      }
    });
  });
} else {
  const jenkins = require("jenkins")({
    baseUrl: "http://ankur:asd@localhost:8080",
    crumbIssuer: true,
  });
  setInterval(() => {
    jenkins.build.get("10secbuild", "lastBuild", function (err, data) {
      if (err) {
        console.error(err.message);
      } else {
        console.log("info", {
          building: data.building,
          status: data.result
        });
      }
    });
  }, 1000);
}

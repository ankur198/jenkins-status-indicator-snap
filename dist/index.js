#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var configManager = __importStar(require("./configManager"));
var ora_1 = __importDefault(require("ora"));
if (configManager.load() != null) {
    configManager.promptCli().then(function (answers) {
        var spinner = ora_1.default('connecting...').start();
        var jenkins = require('jenkins')({
            baseUrl: 'http://ankur:asd@localhost:8080',
            crumbIssuer: true
        });
        jenkins.build.get('10secbuild', 'lastBuild', function (err, data) {
            if (err) {
                spinner.fail(err.message);
            }
            else {
                // console.log('info', data);
                spinner.succeed('connected');
            }
        });
    }).catch(function (err) { return console.log(err); });
}
else {
    var jenkins_1 = require('jenkins')({
        baseUrl: 'http://ankur:asd@localhost:8080',
        crumbIssuer: true
    });
    setInterval(function () {
        jenkins_1.build.get('10secbuild', 'lastBuild', function (err, data) {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log('info', {
                    building: data.building,
                    status: data.result
                });
            }
        });
    }, 1000);
}

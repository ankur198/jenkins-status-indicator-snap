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
exports.promtWeb = exports.promptCli = exports.load = void 0;
const fs = __importStar(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const webServer_1 = __importDefault(require("./webServer"));
const yaml_1 = require("yaml");
const ConfigTypes_1 = require("./ConfigTypes");
exports.load = () => {
    try {
        const configs = yaml_1.parse(fs.readFileSync('~/.jenkins-status-indicator/config', 'utf-8'));
        return configs;
    }
    catch (error) {
        return null;
    }
};
exports.promptCli = async () => {
    const questions = [
        {
            message: 'Where is your jenkins server located?',
            default: 'http://localhost:8080',
            name: 'url'
        },
        {
            message: 'Username',
            name: 'username'
        },
        {
            message: 'Password',
            name: 'password',
            type: 'password'
        }
    ];
    return await new Promise((resolve, reject) => {
        inquirer_1.default.prompt(questions).then((answers) => resolve(answers)).catch(err => reject(err));
    });
};
exports.promtWeb = async () => {
    return new Promise(resolve => {
        webServer_1.default.post('/config', async (req, res) => {
            const data = await req.body;
            const config = new ConfigTypes_1.Config(data.url, data.username, data.password, data.jobName);
            res.send({ config, valid: config.isValid() });
            const newPreset = new ConfigTypes_1.ConfigPreset("test", config);
            resolve(newPreset);
        });
    });
};

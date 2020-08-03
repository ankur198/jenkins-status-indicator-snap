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
Object.defineProperty(exports, "__esModule", { value: true });
const configManager = __importStar(require("./configManager"));
const jenkins = __importStar(require("./jenkins"));
// import ora from 'ora'
const start = async () => {
    if (configManager.load() === null) {
        console.log('no preset found');
        console.log('web server started...');
        while (true) {
            console.log('waiting for config');
            const configPreset = await configManager.promtWeb();
            console.log('verifying config', configPreset);
            try {
                await jenkins.verifyConnection(configPreset.config);
                console.log('verified');
            }
            catch (error) {
                console.error(error);
            }
        }
        console.log('preset done');
    }
};
start();

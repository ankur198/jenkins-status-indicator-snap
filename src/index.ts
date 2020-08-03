#!/usr/bin/env node

import './webServer'
import * as configManager from './configManager'
// import * as jenkins from './jenkins'

// import ora from 'ora'

if (configManager.load() === null) {
  console.log('no preset found')
}
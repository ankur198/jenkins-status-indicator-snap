#!/usr/bin/env node

import './webServer'
import * as configManager from './configManager'
import * as jenkins from './jenkins'
import { updateIndicator } from './indicators'

// import ora from 'ora'

if (configManager.load() === null) {
  console.log('no preset found')
}

setInterval(async () => {
  const configPreset = configManager.load()
  if (configPreset !== null) {
    const status = await jenkins.getJobStatus(configPreset.config)
    updateIndicator(status)
  }
}, 2500)
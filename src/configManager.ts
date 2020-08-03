import * as fs from 'fs'
import { parse as yamlParse } from 'yaml'
import { ConfigPreset } from './ConfigTypes'
import * as jenkins from './jenkins'

export const load = (): string | null => {
  try {
    const configs = yamlParse(fs.readFileSync(
      '~/.jenkins-status-indicator/config',
      'utf-8'
    ))
    return configs
  } catch (error) {
    return null
  }
}

export const newPresetRequest = async (configPreset: ConfigPreset) => {
  await jenkins.verifyConnection(configPreset.config).catch(err => {
    console.error(err)
  })
}

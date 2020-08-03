import * as fs from 'fs'
import { parse as yamlParse, stringify as yamlStringify } from 'yaml'
import { ConfigPreset } from './ConfigTypes'
import * as jenkins from './jenkins'
import { homedir } from 'os'
import { join } from 'path'

const configDir = join(homedir(), '.jenkins-status-indicator')
const configFilePath = join(configDir, 'preset.conf')

export const load = (): ConfigPreset | null => {
  try {
    const configs: ConfigPreset = yamlParse(fs.readFileSync(configFilePath, 'utf-8'))
    return configs
  } catch (error) {
    return null
  }
}

export const newPresetRequest = async (configPreset: ConfigPreset) => {
  try {
    await jenkins.verifyConnection(configPreset.config)
    console.log('new profile verified');
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir)
    }
    if (!fs.existsSync(configFilePath)) {
      fs.writeFileSync(configFilePath, "")
    }

    const data = yamlStringify(configPreset)
    fs.writeFileSync(configFilePath, data)
    console.log(data)

  } catch (error) {
    console.error(error);
  }
}

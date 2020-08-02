import * as fs from 'fs'
import inquirer from 'inquirer'

export const load = (): string | null => {
  try {
    const configs = fs.readFileSync(
      '~/.jenkins-status-indicator/config',
      'utf-8'
    )
    return configs
  } catch (error) {
    return null
  }
}

export const promptCli = async (): Promise<inquirer.Answers> => {
  const questions: inquirer.QuestionCollection<any> = [
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
  ]

  return await new Promise((resolve, reject) => {
    inquirer.prompt(questions).then((answers) => resolve(answers)).catch(err => reject(err))
  })
}

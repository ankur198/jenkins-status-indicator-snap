#!/usr/bin/env node

import * as configManager from './configManager'
import ora from 'ora'
if (configManager.load() != null) {
  configManager.promptCli().then((answers) => {
    const spinner = ora('connecting...').start()
    const jenkins = require('jenkins')({
      baseUrl: 'http://ankur:asd@localhost:8080',
      crumbIssuer: true
    })
    jenkins.build.get('10secbuild', 'lastBuild', function (err: Error, data: any) {
      if (err) {
        spinner.fail(err.message)
      } else {
        // console.log('info', data);
        spinner.succeed('connected')
      }
    })
  }).catch(err => console.log(err))
} else {
  const jenkins = require('jenkins')({
    baseUrl: 'http://ankur:asd@localhost:8080',
    crumbIssuer: true
  })
  setInterval(() => {
    jenkins.build.get('10secbuild', 'lastBuild', function (err: Error, data: any) {
      if (err) {
        console.error(err.message)
      } else {
        console.log('info', {
          building: data.building,
          status: data.result
        })
      }
    })
  }, 1000);
}

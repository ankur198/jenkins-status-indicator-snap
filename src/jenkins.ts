import jenkins from 'jenkins'
import { Config } from './ConfigTypes'

export const verifyConnection = (config: Config): Promise<null> => {
    return new Promise((resolve, reject) => {
        const connection = jenkins({
            baseUrl: `http${config.https ? 's' : ''}://${config.username}:${config.password}@${config.url}`,
            crumbIssuer: true
        })
        connection.job.get(config.jobName, function (err: Error) {
            if (err) {
                reject(err.message)
            }
            else {
                resolve()
            }
        })
    })
}
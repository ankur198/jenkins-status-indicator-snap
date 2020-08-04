import jenkins from 'jenkins'
import { Config } from './ConfigTypes'

export enum Status {
    BUILDING = "BUILDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export const verifyConnection = (config: Config): Promise<void> => {
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


export const getJobStatus = (config: Config): Promise<Status> => {
    return new Promise((resolve, reject) => {
        const connection = jenkins({
            baseUrl: `http${config.https ? 's' : ''}://${config.username}:${config.password}@${config.url}`,
            crumbIssuer: true
        })
        connection.job.get(config.jobName, (err: Error, data: any) => {
            if (err) {
                reject(err.message)
            }
            else {
                const lastBuildNumber = Number(data.builds[0].number)

                connection.build.get(config.jobName, lastBuildNumber, function (err: Error, data: any) {
                    if (err) {
                        reject(err.message)
                    }
                    else {
                        if (data.building) {

                            resolve(Status.BUILDING)
                        }
                        resolve(Status[data.result as keyof typeof Status])
                    }
                })
            }
        })
    })
}
export class Config {
    url: string;
    username: string;
    password: string;
    jobName: string;
    https: boolean;

    constructor(url: string, username: string, password: string, jobName: string) {
        this.username = username;
        this.password = password;
        this.jobName = jobName;
        if (url != undefined && url.startsWith('https://')) {
            this.https = true
            this.url = url.substring(url.indexOf('https://') + 'https://'.length)
        }
        else if (url != undefined && url.startsWith('http://')) {
            this.https = false
            this.url = url.substring(url.indexOf('http://') + 'http://'.length)
        }
        else {
            this.https = false
            this.url = url
        }
    }

    isValid(): boolean {
        return this.url != undefined
            && this.username != undefined
            && this.password != undefined
            && this.jobName != undefined
    }
}

export class ConfigPreset {
    preset: string;
    config: Config
    constructor(preset: string, config: Config) {
        this.preset = preset;
        this.config = config
    }
}
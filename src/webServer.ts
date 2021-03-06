import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { newPresetRequest, load } from './configManager'
import { ConfigPreset, Config } from './ConfigTypes'

const server = express()
server.use(cors())
server.use(express.static("static"))
server.use(bodyParser.json())

server.post('/config', async (req, res) => {
    const data = await req.body
    const config = new Config(data.url, data.username, data.password, data.jobName)
    if (data.presetName != undefined) {
        const newPreset = new ConfigPreset(data.presetName, config)
        const saved = await newPresetRequest(newPreset)
        res.send({ config, valid: config, saved: saved });
    }
})

server.get('/preset', (req, res) => {
    console.log(`request received from ${req.ip}`);
    res.send(load())
})

server.listen(1234)
console.log('web server started...connect to https://127.0.0.1:1234 to configure');

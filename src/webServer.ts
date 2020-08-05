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
    res.send({ config, valid: config.isValid() });
    if (data.presetName != undefined) {
        const newPreset = new ConfigPreset(data.presetName, config)
        newPresetRequest(newPreset)
    }
})

server.get('/preset', (req, res) => {
    console.log(`request received from ${req.ip}`);
    res.send(load())
})

server.listen(process.env.PORT || 1234)
console.log('web server started...');

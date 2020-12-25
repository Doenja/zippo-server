const { exec } = require("child_process");

// possible states: 'ON' | 'OFF' | 'TOGGLE'

const setState = (group, state, res) => {
    if (!group || typeof group !== 'string') {
        return res.status(500).send({error: 'Invalid group'})
    }
    if (!state | (state !== 'ON' && state !== 'OFF' && state !== 'TOGGLE')) {
        return res.status(500).send({error: 'Invalid state'})
    }

    exec(`mosquitto_pub -t zigbee2mqtt/${group}/set -m '{\"state\": \"${state}\"}' -d`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send({error: 'Command does not exist'})
        }
        if (stderr) {
            return res.status(500).send({error: `Err: ${stderr}`})
        }
        return res.status(200).send('State changed')
    });    
} 

module.exports = setState;
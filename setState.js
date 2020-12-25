const { exec } = require("child_process");

// possible groups: 'living_room' | 'bed_room'
// possible states: 'ON' | 'OFF' | 'TOGGLE'

const setState = (group, state, res) => {
    if (!group || typeof group !== 'string') {
        console.log('Error: invalid group')
        return res.status(500).send({error: 'Invalid group'})
    }
    if (!state | (state !== 'ON' && state !== 'OFF' && state !== 'TOGGLE')) {
        console.log('Error: invalid state')
        return res.status(500).send({error: 'Invalid state'})
    }

    exec(`mosquitto_pub -t zigbee2mqtt/${group}/set -m '{\"state\": \"${state}\"}' -d`, (error, stdout, stderr) => {
        if (error) {
            console.log('Error: command not found')
            return res.status(500).send({error: 'Command not found'})
        }
        if (stderr) {
            console.log(`Error: ${stderr}`)
            return res.status(500).send({error: stderr})
        }
        console.log('State changed successfully', group, state)
        return res.status(200).send('State changed')
    });    
} 

module.exports = setState;
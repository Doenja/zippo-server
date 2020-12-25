const { exec } = require("child_process");

// target: the name of a group or an individual lamp
// setting: the name of the setting you want to change, either: 'state', 'color_temp' or 'brightness'
// possible values for state: 'ON' | 'OFF' | 'TOGGLE'
// possible values for color_temp: 150 - 500
// possible values for brightness: 0 - 254

const setState = (res, target, setting, value) => {
    if (!target || typeof target !== 'string') {
        console.log('Error: invalid target')
        return res.status(500).send({error: 'Invalid target'})
    }

    if (setting === 'state' && (value !== 'ON' && value !== 'OFF' && value !== 'TOGGLE')) {
        console.log('Error: invalid value, choose "ON", "OFF" or "TOGGLE"')
        return res.status(500).send({error: 'Invalid value, choose "ON", "OFF" or "TOGGLE"'})
    }
    if (setting === 'color_temp' && (value < 150 || value > 500)) {
        console.log('Error: invalid state, choose a value between 150 and 500')
        return res.status(500).send({error: 'Invalid state, choose a value between 150 and 500'})
    }
    if (setting === 'brightness' && (value < 0 || value > 254)) {
        console.log('Error: invalid state, choose a value between 0 and 254')
        return res.status(500).send({error: 'Invalid state, choose a value between 0 and 254'})
    }

    exec(`mosquitto_pub -t zigbee2mqtt/${target}/set -m '{\"${setting}\": \"${value}\"}' -d`, (error, stdout, stderr) => {
        if (error) {
            console.log('Error: command not found')
            return res.status(500).send({error: 'Command not found'})
        }
        if (stderr) {
            console.log(`Error: ${stderr}`)
            return res.status(500).send({error: stderr})
        }
        console.log('State changed successfully', target, value)
        return res.status(200).send(`State changed successfully, ${target}, ${value}`)
    });    
} 

module.exports = setState;
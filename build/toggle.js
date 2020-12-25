"use strict";
var exec = require("child_process").exec;
var toggle = function () {
    exec("mosquitto_pub -t zigbee2mqtt/light01/set -m '{\"state\": \"TOGGLE\"}' -d", function (error, stdout, stderr) {
        if (error) {
            console.log("error: " + error.message);
            return;
        }
        if (stderr) {
            console.log("stderr: " + stderr);
            return;
        }
        console.log("stdout: " + stdout);
    });
};
module.exports = toggle;

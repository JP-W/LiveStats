var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

function initMQTT() {
    var mosca = require('mosca');
    var settings = { port:1883 };
    var server = new mosca.Server(settings);
    server.on('ready', function(){
        console.log("MQTT Broker Online");
    });
}

function isInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0].toString() == item.toString()) {
            return true;
        }
    }
    return false;
}

console.log("MQTT Connected");

client.on('connect', function () {
    client.subscribe('devices/#')
    client.publish('/', 'Server online')
})
   
client.on('message', function (topic, message) { // EVERY x SECONDS RESET ARRAY
    vals = message.toString().split(",")
    if (!isInArray(devices, vals[0])) {
        devices.push(vals)
    }
})

setInterval(function() {console.log(devices); devices = []}, 1500);

initMQTT();
var devices = 0;
const express = require('express')
const handlebars = require('handlebars');
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.listen(80)
app.get('/', function(req, res) {
    res.render('index', {vars: devices});
});

// NAME, CPU, RAM, IP
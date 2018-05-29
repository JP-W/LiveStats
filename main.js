function initMQTT() {
    var mosca = require('mosca');
    var settings = { port:1883 };
    var server = new mosca.Server(settings);
    server.on('ready', function(){
        console.log("MQTT Broker Online");
    });
}

initMQTT();
var devices = []
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
const express = require('express')
const handlebars = require('handlebars');
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.listen(80)
app.get('/', function(req, res) {
    vars=devices
    res.render('index', {vars: vars});
});

console.log("MQTT Connected");

client.on('connect', function () {
    client.subscribe('devices/#')
    client.publish('/', 'Server online')
})
   
client.on('message', function (topic, message) { // EVERY x SECONDS RESET ARRAY
    console.log(message.toString())
    vals = message.toString().split(",")
    if (vals[0].indexOf(devices) == false) {
        devices.push(vals)
    }
})

setInterval(function() {devices = []}, 1500);
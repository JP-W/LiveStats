// setInterval(function() {devices = []}, 1500);

var devices = [["oi fam", "shank"], ["hello fam", "OOOOF"]];
const express = require('express')
const handlebars = require('handlebars');
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.listen(80)
app.get('/', function(req, res) {
    res.render('test', {vars: devices});
});

// NAME, CPU, RAM, IP
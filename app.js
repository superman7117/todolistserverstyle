'use strict';

var PORT = 4000;

// bring in dependencies / libraries
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

// configure general middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// route definitions
app.get('/', function(req, res) {
  var html = fs.readFileSync('./index.html').toString();
  res.send(html);
});

app.get('/names', function(req, res) {
  fs.readFile('./names.json', function(err, data) {
    if(err) return res.status(400).send(err);
    var arr = JSON.parse(data);
    res.send(arr);
  });
});

app.post('/names', function(req, res) {
  fs.readFile('./names.json', function(err, data) {
    if(err) return res.status(400).send(err);
    var arr = JSON.parse("\n\n"+data+"\n\n\n");
    console.log(req.body);
    var name = req.body.name;
    var newDueDate =req.body.newDueDate
    arr.push({'name': name, 'newDueDate': newDueDate});
    fs.writeFile('./names.json', JSON.stringify(arr), function(err) {
      if(err) return res.status(400).send(err);
      res.send(name = 'recieved.\n');
    });
  });
});


// spin up server
app.listen(PORT, function() {
  console.log('Express server listening on port', PORT)
});

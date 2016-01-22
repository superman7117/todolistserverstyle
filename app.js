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
    var arr = JSON.parse(data);
    console.log(req.body);
    var name = req.body.name;
    var newDueDate = req.body.newDueDate
    arr.push({name: name, newDueDate: newDueDate, complete: false});
    fs.writeFile('./names.json', JSON.stringify(arr), function(err) {
      if(err) return res.status(400).send(err);
      res.send(name = 'recieved.\n');
    });
  });
});

app.post('/names/delete', function(req, res, next) {
	fs.readFile('./names.json', function(err, data) {
		if (err) return res.status(400).send(err);
		var arr = JSON.parse(data);
		var index = parseInt(req.body.index);
		var removed = arr.splice(index, 1);
		fs.writeFile('./names.json', JSON.stringify(arr), function(err, data) {
			if (err) return res.status(400).send(err);
			res.send(removed);
		});
	})
})

app.post('/names/complete', function(req, res, next) {
	fs.readFile('./names.json', function(err, data) {
		if (err) return res.status(400).send(err);
		var arr = JSON.parse(data);
    console.log(arr[0]);
		var index = parseInt(req.body.index);
    console.log(arr[index].name);

    console.log("THE THING!:", arr[index])
    if (arr[index].complete === 'yesyes') {
			arr[index].complete = 'nono';
		} else {
			arr[index].complete = 'yesyes';
		}
		fs.writeFile('./names.json', JSON.stringify(arr), function(err, data) {
			if (err) return res.status(400).send(err);
			res.send(arr[index].complete);
		});
	})
})


// spin up server
app.listen(PORT, function() {
  console.log('Express server listening on port', PORT)
});

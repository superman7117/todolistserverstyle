'use strict';

var PORT = 4000;
var  express = require('express');
var logger = require('morgan')
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser')

// app.get('/names', function(req, res){
//   res.send('\n\nYaY\n\n\n')
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'))


var middleware =function(req,res,next){
  res.send('\n\nFirst Middleware\n\n\n');
  next()
}

// app.use(middleware);
app.get("/", function(req,res){
  var html = fs.readFileSync('./index.html').toString();
    res.send(html);
  })
})

app.get('/names', function(req, res,next){
  fs.readFile('./names.json', funciton(err, data){
    if(err) return res.status(400).send(err);
    var arr = JSON.parse(data):
    res.send(arr)
  })
  res.send("\n\nhere we go\n\n\n")
})

app.post('/', function(req, res){
  fs.readFile('./names.json',function(err, data){
    if(err) return res.status(400).send(err);
    var arr = JSON.parse(data);
    var name = req.body.name;
    arr.push(name);
    fs.writeFile("./times.json", JSON.stringify(arr),function(err){
      if(err) return res.status(400).send(err);

      res.send('\n\n'name + ' posted\n\n');
    });
  });
});

app.listen(4000, function(){
  console.log("Express server listening on port", PORT);
})















// var fs = require('fs');
// var moment = require('moment');
// var http = require("http");
// const PORT = 4000;
//
// var server = http.createServer(function(req, res){
//   if(req.method === "GET"){
//     res.end('ok!');
//   }
//   else if(req.method === "POST") {
//     req.on('data', function(chunk){
//       var stuff = chunk.toString();
//       console.log('stuff:', stuff);
//       var chunkParts = chunk.toString.split('=');
//       console.log('chunkParts', chunkParts);
//     });
//     req.on('end', function(){
//       res.end();
//     });
//   }
//
// })

// var time = moment().format('lll');
//
// var arr = [];
//
// fs.readFile('./times.json', function(err, data){
//   if (err) throw err;
//   arr.push(time)
//   var obj = JSON.parse(data)
//   console.log("obj:", obj);
//   var dude = JSON.parse(arr)
//   console.log('done');
// })
//
// //
// // fs.readFile('./package.json', function(err, data) {
// //   if (err) throw err;
// //   var obj = JSON.parse(data);
// //   console.log('version:', obj.version);
// // });
//
// fs.writeFile('./times.json', arr, function(err){
//   if (err) throw err;
//
//   console.log(time);
//   console.log('done');
// })

var http = require('http');
var fs = require('fs');
var path = require('path');
var extract = require('./extract');
var mime = require('mime');
var wss = require('./websockets-server');

var handleError = function(err, res) {
  fileName = "error.html";
  filePath = path.resolve(__dirname, 'app', fileName);
  fs.readFile(filePath, function(err, data) {
    // I don't think you can have an error when trying to display an error message
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', mime.getType(filePath));
      console.log('Content-Type', mime.getType(filePath));
      res.end(data);
    }
  });
});
server.listen(3000);

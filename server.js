// var http = require('http');
// http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('Hello World!');
// }).listen(8280);


var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    // fs.readFile(__dirname + '/dist/sw7_node/index.html', function(err, data) {
    // fs.readFile('./dist/sw7_node/index.html', function(err, data) {
    fs.readFile('dist/sw7_node/index.html', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(8280);
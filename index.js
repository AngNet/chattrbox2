var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var mime = require("mime");
/*eslint-disable no-unused-vars*/
var wss = require("./websockets-server");

var handleError = function(err, res) {
  fs.readFile("app/error.html", function(err, data) {
    res.writeHead(404, {
      "Content-Type": mime.getType("app/error.html")
    });
    res.write(data);
    res.end();
  });
};

var server = http.createServer(function(req, res) {
  /*eslint-disable no-console*/
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      filePath = "app/error.html";
      handleError(err, res);
      return;
    } else {
      var MediaType = mime.getType(filePath);
      res.setHeader("Content-Type", MediaType);
      res.end(data);
    }
  });
});
server.listen(3000);

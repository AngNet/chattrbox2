/*eslint no-undef: "error"*/
var path = require("path");

var extractFilePath = function(url) {
  var filePath;
  var fileName = "index.html";

  if (url.length > 1) {
    fileName = url.substring(1);
  }/*eslint-disable no-console*/
  console.log("The fileName is: " + fileName);

  /* global require module __dirname */
  filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};

module.exports = extractFilePath;

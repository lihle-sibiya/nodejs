"use strict";

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  fs = require("fs");
const getViewUrl = url => {//getViewURL function takes the request’s URL 
  return `views${url}.html`;//and interpolate it into a view’s file path
};
http
  .createServer((req, res) => {
    let viewUrl = getViewUrl(req.url);//replace filename in fs.readFile with results form getViewUrl
    fs.readFile(viewUrl, (error, data) => {//returns errors that may have occured
      if (error) {//if error occured
        res.writeHead(httpStatus.NOT_FOUND);//handle errors with a response code
        res.write("<h1>FILE NOT FOUND</h1>");
      } else {//if there is no error
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/html"
        });
        res.write(data);//you pass teh data fromt he read file to the client
      }
      res.end();
    });
  })
  .listen(port);
console.log(`The server has started and is listening on port number: ${port}`);

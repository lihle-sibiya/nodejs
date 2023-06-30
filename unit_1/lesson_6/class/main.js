const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs");
const routeMap = {//set up route mapping for HTML files
    "/": "views/index.html"
};
http
    .createServer((req, res) => {
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        if (routeMap[req.url]) {
            fs.readFile(routeMap[req.url], (error, data) => {//read contents of the mapped file
                res.write(data);//respond with file contents
                res.end();
            });
        } else {
            res.end("<h1>Sorry, not found.</h1>");
        }
    })
    .listen(port);
console.log(`The server has started and is listening
    ➥ on port number: ${port}`);
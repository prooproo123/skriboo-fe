const http = require('http');
const fs = require('fs');
var path = require('path');

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile('Scriboo_light.html', (err, data) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(data);
      res.end();
    });
  } else if (req.url.match("\.png$")) {
    var imagePath = path.join(__dirname, 'assets', req.url);
    var fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("No Page Found");
  }
})

server.listen(port, () => {
  console.log(`Server running at port ` + port);
});
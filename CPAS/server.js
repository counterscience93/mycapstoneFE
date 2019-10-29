// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(path.join(__dirname + '/dist')));
var port = process.env.PORT || 3000;
app.listen(port);
console.log('server started ' + port);
// final catch-all route to index.html defined last
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

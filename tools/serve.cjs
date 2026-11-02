const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
http.createServer((req, res) => {
  let filename;
  try { filename = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0])); }
  catch { res.writeHead(400).end(); return; }
  if (!filename.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(filename, (error, data) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    const type = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript'}[path.extname(filename)] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type':type + '; charset=utf-8'}).end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));

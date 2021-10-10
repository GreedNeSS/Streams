'use strict';

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

const rs = fs.createReadStream('1-readable.js');
const gz = zlib.createGzip();

const buffers = [];
let buffer = null;

gz.on('data', buffer => {
	buffers.push(buffer);
});

gz.on('end', () => {
	buffer = Buffer.concat(buffers);
});

rs.pipe(gz);

const server = http.createServer((request, response) => {
	console.log(request.url);
	response.writeHead(200, { 'Content-Encoding': 'gzip' });
	console.log(buffer);
	response.end(buffer);
});

server.listen(8000);
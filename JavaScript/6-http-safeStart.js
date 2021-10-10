'use strict';

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

const once = fn => (...argz) => {
	if (!fn) return;
	const res = fn(...argz);
	fn = null;
	return res;
};

const prepareCache = callback => {
	callback = once(callback);
	let buffer = null;
	const buffers = [];

	const rs = fs.createReadStream('1-readable.js');
	const gz = zlib.createGzip();

	gz.on('data', buffer => {
		buffers.push(buffer);
	});

	gz.once('end', () => {
		buffer = Buffer.concat(buffers);
		callback(null, buffer);
	});

	rs.on('error', callback);
	gz.on('error', callback);

	rs.pipe(gz);
};


const startServer = (err, buffer) => {
	if (err) throw err;

	http.createServer((request, response) => {
		console.log(request.url);
		response.writeHead(200, { 'Content-Encoding': 'gzip' });
		response.end(buffer);
	}).listen(8000);
};

prepareCache(startServer);
'use strict';

const fs = require('fs');
const zlib = require('zlib');

const rs = fs.createReadStream('1-readable.js', 'utf8');
const ws = fs.createWriteStream('copy.js.gz', 'utf8');
const gz = zlib.createGzip();

rs.pipe(gz).pipe(ws);

rs.on('end', () => {
	console.log('Done');
});
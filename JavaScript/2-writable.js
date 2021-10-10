'use strict';

const fs = require('fs');

const rs = fs.createReadStream('1-readable.js', 'utf8');
const ws = fs.createWriteStream('copy.js', 'utf8');

rs.on('data', chunk => {
	console.log(`Copy ${chunk.length} chars`);
	ws.write(chunk);
});

rs.on('end', () => {
	console.log('Done');
});
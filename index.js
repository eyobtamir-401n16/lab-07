'use strict';

const server = require('./lib/server.js');
let serverPort = 8080;
let port = process.env.PORT || serverPort;

server.start(port)
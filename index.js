const express = require("express");

const server = express();

server.use(express.json());

/** Define porta */
server.listen(3333);

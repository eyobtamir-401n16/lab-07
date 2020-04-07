'use strict';

const notFound = (req, res, next ) =>{
res.send(404);
next();
res.end();
}

module.exports = notFound;
'use strict';

const notFound = (req, res, next ) =>{
res.status(404).send('not found')
res.end();
}

module.exports = notFound;
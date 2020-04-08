'use strict'
const fiveHundered= (err,req,res,next) => {
  res.status(500);
  res.send('WTF?');
};

module.exports = fiveHundered;
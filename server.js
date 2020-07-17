const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const morgan = require("morgan");
const { token } = require('morgan');
const server = express();


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(morgan('dev')) // Morgan return a peice of middleware to apply to every path and method
server.use(methodLogger) 
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);


morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    token.status(req, res),
    tokens.res(req, res, "content-length"), '_',
    tokens['repsponse-time'](req, res), 'ms'
  ].join('')
})

function methodLogger(req, res, next) {
  console.log(`${req.method} request`)
  // get get put post or whatever methed is used
  // res.send('requested yay!')
  next()
}

server.use((error, req, res, next) => {
  res.status(error.code).json({ message: 'there was an error', error });

})

module.exports = server;

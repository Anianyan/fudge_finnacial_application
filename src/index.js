const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');

dotenv.config();

const mongodb = require('./storages/mongodb');

mongodb.init();

const { ErrorHandlerMiddleware } = require('./middlewares');

const apiPort = config.get('api.port');

const app = express();

const { userRouter, postRouter, commentRouter } = require('./routers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.use(ErrorHandlerMiddleware.handlePathNotFound);
app.use(ErrorHandlerMiddleware.handleError);

app.listen(apiPort);

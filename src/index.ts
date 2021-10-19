import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';

import { mongoInit } from './storages/mongodb';
dotenv.config();

mongoInit();

import { ErrorHandlerMiddleware } from './middlewares';

const apiPort = config.get('api.port');

const app = express();

import { userRouter, postRouter, commentRouter } from './routers';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// app.use(ErrorHandlerMiddleware.handlePathNotFound);
// app.use(ErrorHandlerMiddleware.handleError);

app.listen(apiPort);
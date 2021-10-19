import { NextFunction } from "express";

const { NotFoundError } = require('../errors');
const { ResponseHandlerUtil } = require('../utils');

export class ErrorHandlerMiddleware {
  static handlePathNotFound(req: Request, res: Response, next: NextFunction) {
    return next(new NotFoundError('Path not found.'));
  }

  // eslint-disable-next-line no-unused-vars
  static handleError(error: any, req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line no-console
    console.log('Error', error.message);
    if (error.customError) {
      return ResponseHandlerUtil.handleError(res, {
        status: error.status,
        message: error.message,
      });
    }

    if (error.name === 'SyntaxError') {
      return ResponseHandlerUtil.handleError(res, {
        status: 400,
        message: error.message,
      });
    }

    return ResponseHandlerUtil.handleError(res, {
      status: 500,
      message: 'The server encountered an internal error. Try again later.',
    });
  }
}

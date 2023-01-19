import { ValidationError } from "class-validator";
import { Response } from "express";

export enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  UNPROCESSABLEENTITY = 422,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Success",
      data: data,
    });
  }

  NotFound(res: Response, data?: any): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not Found",
      error: data,
    });
  }

  UnprocessableEntity(res: Response, data?: any): Response {
    return res.status(HttpStatus.UNPROCESSABLEENTITY).json({
      status: HttpStatus.UNPROCESSABLEENTITY,
      statusMsg: "UnprocessableEntity",
      error: parseErrors(data),
    });
  }

  Unauthorized(res: Response, data?: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).send({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: "Unauthorized",
      error: data,
    });
  }

  Forbidden(res: Response, data?: any): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "Forbidden",
      error: data,
    });
  }

  Error(res: Response, data?: any): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal server error",
      error: data,
    });
  }
}

export function parseErrors(errors: Array<ValidationError> | string): Object {
  const response = {};
  if ( typeof errors === 'string' || errors instanceof String) {
    return errors
  } else {

    for (let error of errors) {
      const property = error.property;
      const children = error.children;

      if (children?.length) {
        response[property] = parseErrors(children);
      } else {
        const constraints = error.constraints;
        const arr = [] as Array<String>;

        for (let constraintKey in constraints) {
          const constraint = constraints[constraintKey].replace(`${property} `, '');
          arr.push(constraint);
        }

        response[property] = arrayToSentence(arr);
      }
    }

    return response;
  }
}

export function arrayToSentence(arr: Array<any>) {
  return (
    arr.slice(0, -2).join(', ') +
    (arr.slice(0, -2).length ? ', ' : '') +
    arr.slice(-2).join(' and ')
  );
}
/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
  constructor(message: string, error?: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

import { HttpStatus } from '@nestjs/common';

export class HttpResponse<T = any> {
  statusCode?: number;
  timestamp?: Date;
  data: T;

  constructor(data: T) {
    this.statusCode = HttpStatus.OK;
    this.timestamp = new Date();
    this.data = data;
  }
}

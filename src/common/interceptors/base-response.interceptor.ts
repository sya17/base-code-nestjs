/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseResponse } from '../interface/base-response.interface';

@Injectable()
export class BaseResponseInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('context.getClass', context.getClass());
    // return next.handle().pipe(tap(() => console.log(`After...`)));
    return next.handle().pipe(
      map((e) => ({
        time: new Date(),
        payload: e,
      })),
    );
  }
}

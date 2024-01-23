import { ApiProperty } from '@nestjs/swagger';
import { pagination } from 'src/common/interface/base-page.interface';
import { BaseResponse } from 'src/common/interface/base-response.interface';

export class BasePageApi<T> implements pagination<T> {
  @ApiProperty()
  totalData: number;
  @ApiProperty()
  totalPage: number;
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  pageSize: number;
}

export class BaseResponseApi<T> implements BaseResponse<T> {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  pagination?: BasePageApi<T>;
  @ApiProperty()
  data?: T;
}

export class BaseResponseSwagger<T> {
  @ApiProperty()
  time: Date;
  @ApiProperty()
  payload: BaseResponseApi<T>;
}

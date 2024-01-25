import { Injectable } from '@nestjs/common';
import { PageAndOrderDto } from 'src/models/page-and-order.model';
import { FindManyOptions, FindOptionsOrder } from 'typeorm';
import { PAGINATION } from '../constants/general.constant';

@Injectable()
export class BuildCriteria<T> {
  private options: FindManyOptions<T> = {};

  where(conditions: Record<string, any>): BuildCriteria<T> {
    if (!this.options.where) {
      this.options.where = {};
    }

    for (const key in conditions) {
      if (conditions.hasOwnProperty(key)) {
        this.options.where[key] = conditions[key];
      }
    }

    return this;
  }

  take(take: number): BuildCriteria<T> {
    this.options.take = take;
    return this;
  }

  skip(skip: number): BuildCriteria<T> {
    this.options.skip = skip;
    return this;
  }

  order(order: FindOptionsOrder<T>): BuildCriteria<T> {
    this.options.order = order;
    return this;
  }

  build(): FindManyOptions<T> {
    return this.options;
  }

  buildWithPagination(pageOrder: PageAndOrderDto): FindManyOptions<T> {
    let page = pageOrder.page ?? PAGINATION.SKIP;
    let limit = pageOrder.limit ?? PAGINATION.LIMIT;
    return this.skip((page - 1) * limit)
      .take(limit)
      .build();
  }
}

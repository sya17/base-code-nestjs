import * as bcrypt from 'bcrypt';
import { pagination } from '../interface/base-page.interface';
export class CommonGeneric {
  isNullOrEmpty(value: any): boolean {
    return value === null || value == '' || value === undefined;
  }

  hashPassword(pass) {
    const hash = bcrypt.hashSync(pass, 10);
    return hash;
  }

  setPage(skip: number, take: number): {} {
    let skipVal = (skip - 1) * take;
    return { skipVal, take };
  }

  getPagination<T>(
    currentPage: number,
    pageSize: number,
    totalData: number,
  ): pagination<T> {
    return {
      currentPage: currentPage,
      pageSize: pageSize,
      totalData: totalData,
      totalPage: Math.ceil(totalData / pageSize),
    };
  }
}

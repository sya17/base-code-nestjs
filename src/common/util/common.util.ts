import * as bcrypt from 'bcrypt';
import { pagination } from '../interface/base-page.interface';
import { queryFilters } from 'src/models/query-filters.model';
import { FilterCriteriaDto } from 'src/models/filter-criteria.model';
import { FILTER_CONSTANT } from '../constants/general.constant';
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

  extractFilter<T>(filters): FilterCriteriaDto<T>[] {
    let criteriaList: FilterCriteriaDto<T>[] = [];

    if (filters && Array.isArray(filters)) {
      filters.forEach((element, index) => {
        console.log(`${index} element`, element);
        criteriaList.push(this.buildFilterCriteria(element));
      });
    } else {
      criteriaList.push(this.buildFilterCriteria(filters));
    }
    console.log('criteriaList', criteriaList);

    return criteriaList;
  }

  buildFilterCriteria<T>(element: string): FilterCriteriaDto<T> {
    // let patternGroup: RegExp = /(AND|OR)\|\[.*\]/;
    let patternGroup: RegExp = /(AND|OR)\|(\[.*?\])/;
    const matchGroup = element.match(patternGroup);
    if (matchGroup) {
      // Group
      let groupOperator: string = matchGroup[1];
      let groupValue = matchGroup[2];
      console.log('groupOperator', groupOperator);
      console.log('groupValue', groupValue);

      const parts = groupValue.slice(1, -1).split(',');

      return {
        connector: groupOperator,
        group: this.extractFilter(parts),
      };
    } else {
      // Alone
      // let regexPatternFilter = /(\w+)\|(\w+)([!=<>]+|>=|<=|=)(\w+)/;
      // let regexPatternFilter = /(\w+)\|(\w+)([!=<>]+|>=|<=|=)(\[\w+-\w+\]|\w+)/;
      let regexPatternFilter =
        /(\w+)\|(\w+)([!=<>]+|>=|<=|=)(\[\w+(?:,\w+)*\]|\w+)/;
      const match = element.match(regexPatternFilter);
      if (match) {
        let connector = match[1];
        let key = match[2];
        let operator = match[3];
        let value = match[4];

        const { operatorSpecial, valueSpecial } = this.specialWhereClause(
          key,
          operator,
          value,
        );
        return {
          connector: connector,
          operator: operatorSpecial ?? operator,
          key: key,
          value: valueSpecial ?? value,
        };
      }
    }
  }

  specialWhereClause(
    key: any,
    operator: string,
    value: any,
  ): { operatorSpecial?: string; valueSpecial?: any } {
    if (
      operator &&
      operator == FILTER_CONSTANT.OPPERATOR.EQUALS &&
      value &&
      key
    ) {
      let val: string = value;
      if (val.startsWith('[') && val.endsWith(']')) {
        if (value.includes('-')) {
          let parts: [] = value.slice(1, -1).split('-');
          return {
            operatorSpecial: 'BETWEEN',
            valueSpecial: parts,
          };
        } else if (value.includes(',')) {
          let parts: [] = value.slice(1, -1).split(',');
          return {
            operatorSpecial: 'IN',
            valueSpecial: parts,
          };
        } else {
          let parts: [] = value.slice(1, -1).split(',');
          return {
            operatorSpecial: 'IN',
            valueSpecial: parts,
          };
        }
        // } else if (typeof value == 'string') {
        //   let val: string = value;
        // } else if (typeof value == 'number') {
        // } else if (typeof value == 'bigint') {
        // } else if (typeof value == 'boolean') {
        // } else if (typeof value == 'object') {
        // } else if (typeof value == 'function') {
        // } else if (typeof value == 'symbol') {
      }
    }
    return {
      operatorSpecial: undefined,
      valueSpecial: undefined,
    };
  }
}

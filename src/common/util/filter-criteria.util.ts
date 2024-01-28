import { Injectable } from '@nestjs/common';
import { FilterCriteriaDto } from 'src/models/filter-criteria.model';
import { PageAndOrderDto } from 'src/models/page-and-order.model';
import {
  And,
  Between,
  Brackets,
  Equal,
  FindManyOptions,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { BuildCriteria } from './build-criteria.util';
import { FILTER_CONSTANT } from '../constants/general.constant';

@Injectable()
export class FilterCriteriaUtil<T> {
  filter(
    filterList: FilterCriteriaDto<T>[],
    pageOrder?: PageAndOrderDto,
  ): FindManyOptions<T> {
    console.log('START FILTER UTIL');
    let builder: BuildCriteria<T> = new BuildCriteria<T>();

    if (filterList) {
      filterList.forEach((criteria) => {
        console.log('criteria', criteria);
        let whereClause: Record<string, any> = {};
        whereClause['true'] = true;
        if (criteria && criteria.group) {
          // Group
          whereClause;
          criteria.group.forEach((element) => {});
        } else {
          // Alone
          if (criteria.operator) {
            switch (criteria.operator) {
              case FILTER_CONSTANT.OPPERATOR.EQUALS:
                whereClause[criteria.key] = Equal(criteria.value);
                break;
              case FILTER_CONSTANT.OPPERATOR.NOT_EQUALS:
                whereClause[criteria.key] = Not(criteria.value);
                break;
              case FILTER_CONSTANT.OPPERATOR.GREATER_THAN:
                whereClause[criteria.key] = MoreThan(criteria.value);
                break;
              case FILTER_CONSTANT.OPPERATOR.GREATER_THAN_OR_EQUALS:
                whereClause[criteria.key] = MoreThanOrEqual(criteria.value);
                break;
              case FILTER_CONSTANT.OPPERATOR.GREATER_THAN_OR_EQUALS:
                whereClause[criteria.key] = MoreThanOrEqual(criteria.value);
                break;
              case FILTER_CONSTANT.OPPERATOR.LESS_THAN:
                whereClause[criteria.key] = LessThan(criteria.value);
                break;
              case FILTER_CONSTANT.OPPERATOR.LESS_THAN_OR_EQUALS:
                whereClause[criteria.key] = LessThanOrEqual(criteria.value);
                break;
              case FILTER_CONSTANT.OPPERATOR.SPECIAL_OPPERATOR.BETWEEN:
                whereClause[criteria.key] = Between(
                  criteria.value[0],
                  criteria.value[1],
                );
                break;
              case FILTER_CONSTANT.OPPERATOR.SPECIAL_OPPERATOR.IN:
                whereClause[criteria.key] = In(criteria.value);
                break;
              default:
                whereClause;
                break;
            }
          }
        }

        builder.where(whereClause);
      });
    }

    if (pageOrder) {
      return builder.buildWithPagination(pageOrder);
    } else {
      return builder.build();
    }
  }
}

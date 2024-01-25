export class FilterCriteriaDto<T> {
  connector: string;
  operator?: string;
  key?: any;
  value?: any;
  group?: FilterCriteriaDto<T>[];
}

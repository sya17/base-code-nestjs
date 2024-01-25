export const APP_CONSTANT = {
  endpoint_version: 'api/v1/',
};

export const FILTER_CONSTANT = {
  CONNECTOR: {
    AND: 'AND',
    OR: 'OR',
    AND_EXISTS: 'AND EXISTS',
    OR_EXISTS: 'OR EXISTS',
    ORDER_BY: 'ORDER BY',
    GROUP_BY: 'GROUP BY',
  },
  OPPERATOR: {
    EQUALS: '=',
    NOT_EQUALS: '!=',
    GREATER_THAN: '>',
    LESS_THAN: '<',
    GREATER_THAN_OR_EQUALS: '>=',
    LESS_THAN_OR_EQUALS: '<=',
    SPECIAL_OPPERATOR: {
      BETWEEN: 'BETWEEN',
      IN: 'IN',
    },
  },
};

export const PAGINATION = {
  SKIP: 1,
  LIMIT: 20,
};

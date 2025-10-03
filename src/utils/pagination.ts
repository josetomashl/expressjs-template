export interface Paginated<T> {
  items: T[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

interface QueryParams {
  [key: string]: string | QueryParams | (QueryParams | string)[] | undefined;
}
export interface IPaginationParams {
  page: number;
  limit: number;
  offset: number;
  sort: string;
  order: string;
}
export function getPaginationParams(query: QueryParams): IPaginationParams {
  let page = 1;
  if (typeof query.page === 'string' && query.page && !isNaN(parseInt(query.page, 10))) {
    page = Math.abs(parseInt(query.page, 10));
  }
  let limit = 10;
  if (typeof query.limit === 'string' && query.limit && !isNaN(parseInt(query.limit, 10))) {
    limit = Math.abs(parseInt(query.limit, 10));
  }

  const offset = (page - 1) * limit;

  let order = 'ASC';
  if (typeof query.order === 'string' && ['ASC', 'DESC'].includes(query.order.toUpperCase())) {
    order = query.order.toUpperCase();
  }

  let sort = 'id';
  if (typeof query.sort === 'string' && query.sort) {
    sort = query.sort;
  }

  return { page, limit, order, sort, offset };
}

export type Where<T extends object> =
  | WhereClause<Partial<T>>
  | WhereClause<Partial<T>>[];

export type WhereClause<T> = {
  [K in keyof T]: Operations<T[K]>;
};

export type Operations<T> = {
  $gt?: T;
  $lt?: T;
  $eq?: T;
};

export type ExcludeMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
>;

interface Class<T> {
  new (...args: any[]): T;
}

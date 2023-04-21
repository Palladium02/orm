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

export interface Class<T> {
  new (...args: any[]): T;
}

export type MySqlAdapterOptions = {
  user?: string;
  password?: string;
  host?: string;
  database?: string;
};

export type PgAdapterOptions = {
  user?: string;
  password?: string;
  host?: string;
  database?: string;
  port?: number;
  connectionString?: string;
  ssl?: any;
  types?: any;
  statement_timeout?: number;
  query_timeout?: number;
  application_name?: string;
  connectionTimeoutMillis?: number;
  idle_in_transaction_session_timeout?: number;
};

export type DatasourceOptions =
  | ({
      flavour: "mysql";
      entities: Class<any>[];
    } & MySqlAdapterOptions)
  | ({
      flavour: "pg";
      entities: Class<any>[];
    } & PgAdapterOptions);

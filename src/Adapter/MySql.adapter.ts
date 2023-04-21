import mysql from "mysql2/promise";
import { Adapter } from "./Adapter";
import type { MySqlAdapterOptions } from "../typings";

export class MySqlAdapter extends Adapter {
  constructor(options: MySqlAdapterOptions) {
    super();
    this.options = options;
  }

  public async query<T>(query: string): Promise<T> {
    if (!this.connection)
      this.connection = await mysql.createConnection(this.options);

    const [rows] = await this.connection.query(query);
    return rows as T;
  }

  protected connection?: mysql.Connection;
  protected options: MySqlAdapterOptions;
}

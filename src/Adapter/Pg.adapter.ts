import { Client } from "pg";
import { Adapter } from "./Adapter";
import type { PgAdapterOptions } from "../typings";

export class PgAdapter extends Adapter {
  constructor(options: PgAdapterOptions) {
    super();
    this.connection = new Client(options);
  }

  public async query<T>(query: string): Promise<T> {
    if (!this.isConnected) {
      await this.connection.connect();
    }

    const result = await this.connection.query(query);
    return result as T;
  }

  protected connection: Client;
  protected isConnected: boolean = false;
}

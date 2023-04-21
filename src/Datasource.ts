import { Adapter } from "./Adapter/Adapter";
import { MySqlAdapter } from "./Adapter/MySql.adapter";
import { PgAdapter } from "./Adapter/Pg.adapter";
import type { DatasourceOptions, Class } from "./typings";

class Source {
  public init(options: DatasourceOptions) {
    const flavour = options.flavour;
    const entities = options.entities;

    entities.forEach((entity) => {
      this.entities.set(entity, entity);
    });

    delete (options as Partial<DatasourceOptions>).flavour;
    delete (options as Partial<DatasourceOptions>).entities;
    switch (flavour) {
      case "mysql": {
        this.adapter = new MySqlAdapter(options);
      }
      case "pg": {
        this.adapter = new PgAdapter(options);
      }
      default: {
        throw new Error("Cannot initialze datasource without a flavour.");
      }
    }
  }

  public async $raw<T>(query: string) {
    if (!this.adapter)
      throw new Error(
        "Cannot perform raw query without having initialzed the datasource."
      );
    return this.adapter.query<T>(query);
  }

  public getRepository<T>(entity: Class<T>): T {
    return new (this.entities.get(entity) as any)();
  }

  private adapter?: Adapter;
  private entities: Map<Class<unknown>, Class<unknown>> = new Map();
}

export const Datasource = new Source();

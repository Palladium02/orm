import { QueryBuilder } from "./QueryBuilder";
import type { Where, ExcludeMethods } from "./typings";

export class Entity {
  find(where: Where<ExcludeMethods<typeof this>>) {
    return `SELECT * FROM ${
      this.constructor.name
    } WHERE ${new QueryBuilder().where(where)};`;
  }

  findOne(where: Where<ExcludeMethods<typeof this>>) {
    return `SELECT * FROM ${
      this.constructor.name
    } WHERE ${new QueryBuilder().where(where)} LIMIT 1;`;
  }

  delete(where: Where<ExcludeMethods<typeof this>>) {
    return `DELETE FROM ${
      this.constructor.name
    } WHERE ${new QueryBuilder().where(where)}`;
  }

  update(
    where: Where<ExcludeMethods<typeof this>>,
    data: ExcludeMethods<typeof this>
  ) {}
}

import { QueryBuilder } from "./QueryBuilder";
import { Datasource } from "./Datasource";
import type { Where, ExcludeMethods } from "./typings";

export class Entity {
  async create(data: Partial<ExcludeMethods<typeof this>>) {
    const columns = `(${Object.keys(data).join(",")})`;
    const values = `(${Object.values(data).join(",")})`;
    return await Datasource.$raw(
      `INSERT INTO ${this.constructor.name} ${columns} VALUES ${values}`
    );
  }

  async find(where: Where<ExcludeMethods<typeof this>>) {
    return await Datasource.$raw(
      `SELECT * FROM ${this.constructor.name} WHERE ${new QueryBuilder().where(
        where
      )};`
    );
  }

  async findOne(where: Where<ExcludeMethods<typeof this>>) {
    return Datasource.$raw(
      `SELECT * FROM ${this.constructor.name} WHERE ${new QueryBuilder().where(
        where
      )} LIMIT 1;`
    );
  }

  async delete(where: Where<ExcludeMethods<typeof this>>) {
    return Datasource.$raw(
      `DELETE FROM ${this.constructor.name} WHERE ${new QueryBuilder().where(
        where
      )}`
    );
  }

  async update(
    where: Where<ExcludeMethods<typeof this>>,
    data: Partial<ExcludeMethods<typeof this>>
  ) {
    const selector = new QueryBuilder().where(where);
    const set = Object.entries(data)
      .map((pair) => pair.join("="))
      .join(",");
    return Datasource.$raw(
      `UPDATE ${this.constructor.name} SET ${set} WHERE ${selector};`
    );
  }
}

import type { Where, Operations } from "./typings";

export class QueryBuilder {
  where<T extends object>(where: Where<T>) {
    if (Array.isArray(where)) {
      return where.map((w) => `(${QueryBuilder.where(w)})`).join(" OR ");
    }
    return QueryBuilder.where(where);
  }

  static where<T extends object>(where: Where<T>) {
    return Object.entries<Operations<any>>(where)
      .map(([attribute, operations]) => {
        return Object.entries(operations)
          .map(([operation, value]) => {
            return `${attribute}${QueryBuilder.translate(operation)}${value}`;
          })
          .join(" AND ");
      })
      .join(" AND ");
  }

  static translate(operator: string): string {
    return "";
  }
}

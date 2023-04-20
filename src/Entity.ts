import type { Where, ExcludeMethods } from "./typings";

export class Entity {
  find(where: Where<ExcludeMethods<typeof this>>) {}

  findOne(where: Where<ExcludeMethods<typeof this>>) {}

  delete(where: Where<ExcludeMethods<typeof this>>) {}

  update(
    where: Where<ExcludeMethods<typeof this>>,
    data: ExcludeMethods<typeof this>
  ) {}
}

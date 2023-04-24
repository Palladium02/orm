import { test, expect, jest } from "@jest/globals";
import { QueryBuilder } from "../src/QueryBuilder";

test("Testing instanciation", () => {
  const qb = new QueryBuilder();
  expect(qb).toBeInstanceOf(QueryBuilder);
});

test("Testing QueryBuilder.translate", () => {
  expect(QueryBuilder.translate("$eq")).toBe("=");
  expect(QueryBuilder.translate("$lt")).toBe("<");
  expect(QueryBuilder.translate("$gt")).toBe(">");
  expect(QueryBuilder.translate("")).toBeUndefined();
});

test("Testing QueryBuilder.where", () => {
  expect(
    QueryBuilder.where({
      id: {
        $eq: 1,
      },
    })
  ).toBe("id=1");

  expect(
    QueryBuilder.where({
      id: {
        $eq: 1,
      },
      age: {
        $gt: 21,
      },
    })
  ).toBe("id=1 AND age>21");
});

test("Testing .where", () => {
  const qb = new QueryBuilder();

  expect(
    qb.where({
      id: {
        $eq: 1,
      },
    })
  ).toBe("id=1");

  expect(
    qb.where([
      {
        id: {
          $eq: 1,
        },
      },
    ])
  ).toBe("(id=1)");

  expect(
    qb.where([
      {
        id: {
          $eq: 1,
        },
      },
      {
        id: {
          $eq: 2,
        },
      },
    ])
  ).toBe("(id=1) OR (id=2)");
});

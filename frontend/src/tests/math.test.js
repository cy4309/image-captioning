import { expect, test } from "vitest";

function add(a, b) {
  return a + b;
}

test("加法 function", () => {
  expect(add(2, 3)).toBe(5);
});

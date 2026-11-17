import test from "node:test";
import assert from "node:assert/strict";
import { api } from "../src/api.js";

test("api helper is defined as a function", () => {
  assert.equal(typeof api, "function");
});

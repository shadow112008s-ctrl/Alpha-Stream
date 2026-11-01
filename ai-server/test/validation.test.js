import test from "node:test";
import assert from "node:assert/strict";
import { messageSchema, normalizeModel } from "../src/server.js";

test("accepts a normal assistant message", () => {
  assert.equal(messageSchema.safeParse({ message: "How do I change subtitles?" }).success, true);
});

test("rejects empty messages", () => {
  assert.equal(messageSchema.safeParse({ message: "   " }).success, false);
});

test("rejects messages over the size limit", () => {
  assert.equal(messageSchema.safeParse({ message: "x".repeat(4001) }).success, false);
});

test("rejects unexpected request fields", () => {
  assert.equal(messageSchema.safeParse({ message: "Hello", apiKey: "not-allowed" }).success, false);
});

test("requires an explicitly configured model", () => {
  assert.equal(normalizeModel(undefined), "");
  assert.equal(normalizeModel("   "), "");
  assert.equal(normalizeModel("  model-enabled-in-project  "), "model-enabled-in-project");
});

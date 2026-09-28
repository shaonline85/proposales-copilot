import assert from "node:assert/strict";
import test from "node:test";

import { getProposalesConfig } from "./config";

const originalApiUrl = process.env.PROPOSALES_API_URL;
const originalApiKey = process.env.PROPOSALES_API_KEY;

test("throws a clear error when required Proposales config is missing", () => {
  delete process.env.PROPOSALES_API_URL;
  delete process.env.PROPOSALES_API_KEY;

  assert.throws(() => {
    getProposalesConfig();
  }, /PROPOSALES_API_URL|PROPOSALES_API_KEY/);
});

test("normalizes API URL by removing a trailing slash", () => {
  process.env.PROPOSALES_API_URL = "https://example.com/";
  process.env.PROPOSALES_API_KEY = "test-key";

  const config = getProposalesConfig();

  assert.equal(config.baseUrl, "https://example.com");
  assert.equal(config.apiKey, "test-key");
});

process.on("exit", () => {
  if (originalApiUrl === undefined) {
    delete process.env.PROPOSALES_API_URL;
  } else {
    process.env.PROPOSALES_API_URL = originalApiUrl;
  }

  if (originalApiKey === undefined) {
    delete process.env.PROPOSALES_API_KEY;
  } else {
    process.env.PROPOSALES_API_KEY = originalApiKey;
  }
});

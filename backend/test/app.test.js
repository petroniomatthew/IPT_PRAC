const { after, before, test } = require("node:test");
const assert = require("node:assert/strict");

const app = require("../app");

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("GET /api/health reports a healthy API", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
});

test("ticket routes reject unauthenticated requests", async () => {
  const response = await fetch(`${baseUrl}/api/tickets`);
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(body.success, false);
  assert.equal(body.message, "No token provided");
});

test("unknown routes use the standard error response", async () => {
  const response = await fetch(`${baseUrl}/api/missing`);
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(body.success, false);
});

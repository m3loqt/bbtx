import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawnSync, spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  KEY_LOCATION,
  MAX_AUTO_URLS,
  SITE_HOST,
  SITE_ORIGIN,
} from "../../scripts/indexnow/config.mts";
import {
  buildPayload,
  canonicalize,
  describeResponse,
  diffManifests,
  fingerprintHtml,
  isSubmittableUrl,
  parseSitemap,
  parseUrlList,
} from "../../scripts/indexnow/lib.mts";

const read = (p) => readFileSync(p, "utf8");

// ---------- the key ----------

test("the IndexNow key is valid and served from public/<key>.txt containing only the key", () => {
  assert.match(INDEXNOW_KEY, /^[a-zA-Z0-9-]{8,128}$/, "protocol: 8-128 chars of a-z A-Z 0-9 -");
  const file = `public/${INDEXNOW_KEY}.txt`;
  assert.ok(existsSync(file), `${file} is missing`);
  assert.equal(read(file), INDEXNOW_KEY, "file must contain exactly the key (no newline, no extra text)");
  assert.equal(KEY_LOCATION, `https://www.bbtx.ai/${INDEXNOW_KEY}.txt`);
});

test("only one key file exists in public/ (no duplicate integration)", () => {
  const { globSync } = process.getBuiltinModule("node:fs");
  const keyFiles = globSync("public/*.txt").filter((f) => /^public\/[a-zA-Z0-9-]{8,128}\.txt$/.test(f) && f !== "public/llms.txt");
  assert.deepEqual(keyFiles, [`public/${INDEXNOW_KEY}.txt`]);
});

test("the key file is reachable: middleware does not intercept it and robots.txt does not block it", () => {
  const middleware = read("middleware.ts");
  assert.doesNotMatch(middleware, new RegExp(INDEXNOW_KEY));
  const entries = [...(middleware.match(/matcher:\s*\[([^\]]*)\]/)?.[1] ?? "").matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assert.ok(entries.length > 0);
  for (const entry of entries) {
    const prefix = entry.replace(/\/:path\*$/, "/");
    assert.ok(prefix.length > 1, `matcher "${entry}" would catch the site root`);
    assert.equal(`/${INDEXNOW_KEY}.txt`.startsWith(prefix), false, `matcher "${entry}" intercepts the key file`);
  }
  assert.match(read("app/robots.ts"), /allow: "\/"/);
});

// ---------- URL rules ----------

test("isSubmittableUrl: https www host, canonical form only", () => {
  const ok = [
    "https://www.bbtx.ai",
    "https://www.bbtx.ai/services/ai-integration",
    "https://www.bbtx.ai/chaotic-confluence/some-post",
  ];
  const bad = [
    "http://www.bbtx.ai/services",
    "https://bbtx.ai/services",
    "https://staging.bbtx.ai/services",
    "https://bbtx-abc123.vercel.app/services",
    "https://www.bbtx.ai/services/",
    "https://www.bbtx.ai/services?utm=1",
    "https://www.bbtx.ai/services#top",
    "https://www.bbtx.ai/admin",
    "https://www.bbtx.ai/admin/content",
    "https://www.bbtx.ai/api/contact",
    "not a url",
  ];
  for (const url of ok) assert.equal(isSubmittableUrl(url), true, url);
  for (const url of bad) assert.equal(isSubmittableUrl(url), false, url);
  assert.equal(canonicalize("https://www.bbtx.ai/"), "https://www.bbtx.ai");
});

test("parseSitemap reads <loc>, decodes entities and de-duplicates", () => {
  const xml = `<urlset><url><loc>https://www.bbtx.ai</loc></url><url><loc> https://www.bbtx.ai/a?x=1&amp;y=2 </loc></url><url><loc>https://www.bbtx.ai</loc></url></urlset>`;
  assert.deepEqual(parseSitemap(xml), ["https://www.bbtx.ai", "https://www.bbtx.ai/a?x=1&y=2"]);
});

test("parseUrlList ignores comments and blank lines and accepts spaces or commas", () => {
  assert.deepEqual(parseUrlList("# c\n\nhttps://www.bbtx.ai/a\n# d\nhttps://www.bbtx.ai/b, https://www.bbtx.ai/c"), [
    "https://www.bbtx.ai/a",
    "https://www.bbtx.ai/b",
    "https://www.bbtx.ai/c",
  ]);
});

// ---------- initial release set ----------

test("initial-urls.txt is the Batch 1 release set, all canonical and all in the sitemap", () => {
  const urls = parseUrlList(read("scripts/indexnow/initial-urls.txt"));
  assert.deepEqual(urls.sort(), [
    "https://www.bbtx.ai/resources",
    "https://www.bbtx.ai/resources/ai-readiness-assessment",
    "https://www.bbtx.ai/services/ai-integration",
    "https://www.bbtx.ai/services/implementation-support",
    "https://www.bbtx.ai/services/leadership-development",
    "https://www.bbtx.ai/services/organizational-assessment",
    "https://www.bbtx.ai/services/strategy-advisory",
  ]);
  const sitemap = read("app/sitemap.ts");
  for (const url of urls) {
    assert.ok(isSubmittableUrl(url), url);
    assert.ok(sitemap.includes("${BASE_URL}" + url.slice(SITE_ORIGIN.length)), `${url} is not in app/sitemap.ts`);
    const route = url.slice(SITE_ORIGIN.length);
    assert.ok(existsSync(`app${route}/page.tsx`), `${url} has no page`);
  }
});

// ---------- fingerprinting ----------

const page = ({ title = "T", description = "D", h1 = "Heading", body = "Body copy.", ld = { "@type": "Article", a: 1, b: 2 }, chunk = "abc", nav = "Home About" } = {}) => `<!doctype html>
<html><head>
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="https://www.bbtx.ai/x">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script src="/_next/static/chunks/${chunk}.js" nonce="${chunk}" async></script>
</head><body>
<nav>${nav}</nav>
<main><h1>${h1}</h1><p>${body}</p></main>
<footer>(c) BBTx ${nav}</footer>
<script>self.__next_f.push([1,"${chunk}"])</script>
</body></html>`;

test("fingerprint ignores build noise: chunk hashes, nonces, scripts, nav/footer, JSON-LD key order", () => {
  const base = fingerprintHtml(page());
  assert.equal(fingerprintHtml(page({ chunk: "zzz999" })).hash, base.hash);
  assert.equal(fingerprintHtml(page({ nav: "Home About Pricing" })).hash, base.hash);
  assert.equal(fingerprintHtml(page({ ld: { b: 2, a: 1, "@type": "Article" } })).hash, base.hash);
  assert.equal(base.title, "T");
});

test("fingerprint detects what search engines index: title, description, headings, body, schema", () => {
  const base = fingerprintHtml(page()).hash;
  for (const change of [{ title: "T2" }, { description: "D2" }, { h1: "Other" }, { body: "New body." }, { ld: { "@type": "Article", a: 1, b: 3 } }]) {
    assert.notEqual(fingerprintHtml(page(change)).hash, base, JSON.stringify(change));
  }
});

test("a <title> streamed into <body> doesn't change the fingerprint (Next.js streams metadata on dynamic pages)", () => {
  const inHead = page({ title: "Streamed Post" });
  // Same page, but the title arrives in the body, as a hidden streamed chunk.
  const inBody = inHead
    .replace("<title>Streamed Post</title>", "")
    .replace("</body>", '<div hidden><title>Streamed Post</title></div></body>');
  assert.notEqual(inHead, inBody);
  const a = fingerprintHtml(inHead);
  const b = fingerprintHtml(inBody);
  assert.equal(b.hash, a.hash);
  assert.equal(b.title, "Streamed Post", "the title is still captured when it is in the body");
});

// ---------- diff and payload ----------

test("diffManifests separates added, changed, removed and unchanged", () => {
  const rec = (hash) => ({ hash, title: "" });
  const prev = { "https://www.bbtx.ai/a": rec("1"), "https://www.bbtx.ai/b": rec("2"), "https://www.bbtx.ai/gone": rec("3") };
  const current = { "https://www.bbtx.ai/a": rec("1"), "https://www.bbtx.ai/b": rec("9"), "https://www.bbtx.ai/new": rec("4") };
  assert.deepEqual(diffManifests(prev, current), {
    added: ["https://www.bbtx.ai/new"],
    changed: ["https://www.bbtx.ai/b"],
    removed: ["https://www.bbtx.ai/gone"],
    unchanged: ["https://www.bbtx.ai/a"],
  });
  assert.deepEqual(diffManifests(current, current).added, []);
  assert.deepEqual(diffManifests(current, current).changed, []);
});

test("buildPayload follows the IndexNow protocol and refuses anything off-host", () => {
  const body = buildPayload(["https://www.bbtx.ai/a", "https://www.bbtx.ai/a", "https://www.bbtx.ai/b"]);
  assert.deepEqual(body, {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: ["https://www.bbtx.ai/a", "https://www.bbtx.ai/b"],
  });
  assert.equal(INDEXNOW_ENDPOINT, "https://api.indexnow.org/indexnow");
  assert.throws(() => buildPayload([]), /no URLs/);
  assert.throws(() => buildPayload(["https://example.com/a"]), /not submittable/);
  assert.throws(() => buildPayload(["https://www.bbtx.ai/admin"]), /not submittable/);
  assert.throws(() => buildPayload(Array.from({ length: 10_001 }, (_, i) => `https://www.bbtx.ai/p${i}`)), /10,000/);
});

test("describeResponse: 200/202 succeed; documented error codes do not", () => {
  assert.equal(describeResponse(200).ok, true);
  assert.equal(describeResponse(202).ok, true);
  for (const code of [400, 403, 422, 429, 500, 0]) assert.equal(describeResponse(code).ok, false, String(code));
});

// ---------- production-only guarantees ----------

test("workflow runs only after a successful Production deployment or a manual run on main", () => {
  const yml = read(".github/workflows/indexnow.yml");
  const triggers = yml.slice(yml.indexOf("\non:"), yml.indexOf("\npermissions:"));
  assert.match(triggers, /deployment_status:/);
  assert.match(triggers, /workflow_dispatch:/);
  for (const forbidden of ["push:", "pull_request", "pull_request_target:", "schedule:", "workflow_run:", "release:"]) {
    assert.equal(triggers.includes(forbidden), false, `workflow must not trigger on ${forbidden}`);
  }
  const cond = yml.slice(yml.indexOf("    if: >-"), yml.indexOf("    runs-on:"));
  assert.match(cond, /github\.event\.deployment_status\.state == 'success'/);
  assert.match(cond, /github\.event\.deployment\.environment == 'Production'/);
  assert.match(cond, /github\.ref == 'refs\/heads\/main'/);
  assert.match(yml, /permissions:\s*\n\s+contents: read/);
});

test("workflow never interpolates user input into a shell script", () => {
  const yml = read(".github/workflows/indexnow.yml");
  for (const [i, line] of yml.split("\n").entries()) {
    if (line.includes("${{ inputs.")) assert.match(line, /^\s+INPUT_[A-Z_]+: /, `line ${i + 1} interpolates inputs outside env: ${line.trim()}`);
  }
});

test("IndexNow is not wired into builds, dev, or Vercel", () => {
  const pkg = JSON.parse(read("package.json"));
  for (const [name, command] of Object.entries(pkg.scripts)) {
    assert.doesNotMatch(command, /indexnow/i, `npm script "${name}" must not call IndexNow`);
  }
  for (const hook of ["prebuild", "postbuild", "vercel-build", "postinstall", "prepare"]) {
    assert.equal(hook in pkg.scripts, false, `no ${hook} hook`);
  }
  assert.equal(existsSync("vercel.json"), false, "no vercel.json build hooks");
  assert.doesNotMatch(read("next.config.ts"), /indexnow/i);
});

// ---------- the real script, against a fake origin ----------

function fakeOrigin(routes) {
  const server = createServer((req, res) => {
    const route = routes[req.url];
    if (!route) return res.writeHead(404).end("not found");
    if (typeof route === "number") return res.writeHead(route).end();
    res.writeHead(200, { "Content-Type": route.type ?? "text/html" }).end(route.body);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve({ server, origin: `http://127.0.0.1:${server.address().port}` })));
}

const sitemapOf = (paths) =>
  `<urlset>${paths.map((p) => `<url><loc>${SITE_ORIGIN}${p}</loc></url>`).join("")}</urlset>`;

function runScript(args, env) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["scripts/indexnow/submit.mts", ...args], {
      env: { ...process.env, GITHUB_ACTIONS: "", GITHUB_STEP_SUMMARY: "", ...env },
    });
    let output = "";
    child.stdout.on("data", (d) => (output += d));
    child.stderr.on("data", (d) => (output += d));
    child.on("close", (code) => resolve({ code, output }));
  });
}

test("script (against a fake origin): baseline, then changed/added/removed, always dry-run outside CI", async () => {
  const keyRoute = { [`/${INDEXNOW_KEY}.txt`]: { type: "text/plain", body: INDEXNOW_KEY } };
  const v1 = {
    "/": { body: page({ h1: "Home" }) },
    "/a": { body: page({ h1: "A v1" }) },
    "/b": { body: page({ h1: "B" }) },
    "/gone": { body: page({ h1: "Gone" }) },
  };
  const first = await fakeOrigin({ "/sitemap.xml": { type: "application/xml", body: sitemapOf(["/", "/a", "/b", "/gone"]) }, ...v1, ...keyRoute });
  const out1 = mkdtempSync(join(tmpdir(), "indexnow-"));
  try {
    // Run 1: no baseline -> records one, submits nothing.
    const run1 = await runScript(["--out", out1], { INDEXNOW_FETCH_ORIGIN: first.origin });
    assert.equal(run1.code, 0, run1.output);
    assert.match(run1.output, /DRY RUN/);
    assert.match(run1.output, /not running in GitHub Actions/);
    assert.match(run1.output, /No baseline found/);
    const report1 = JSON.parse(read(join(out1, "report.json")));
    assert.equal(report1.dryRun, true);
    assert.deepEqual(report1.toSubmit, []);
    assert.equal(existsSync(join(out1, "manifest.json")), false, "dry run must not write a baseline");
  } finally {
    first.server.close();
  }

  // Build the baseline the way a live run would, then change the site.
  const baseline = { version: 1, generatedAt: "2026-11-18T00:00:00Z", origin: SITE_ORIGIN, pages: {} };
  for (const [path, route] of Object.entries(v1)) baseline.pages[canonicalize(`${SITE_ORIGIN}${path}`)] = fingerprintHtml(route.body);
  const prevPath = join(out1, "prev.json");
  writeFileSync(prevPath, JSON.stringify(baseline));

  const second = await fakeOrigin({
    "/sitemap.xml": { type: "application/xml", body: sitemapOf(["/", "/a", "/b", "/new", "/blog/"]) }, // /gone dropped; /blog/ is non-canonical
    "/": v1["/"],
    "/a": { body: page({ h1: "A v2" }) }, // changed
    "/b": v1["/b"], // unchanged
    "/new": { body: page({ h1: "New" }) }, // added
    // /gone now 404s (removed)
    ...keyRoute,
  });
  try {
    const out2 = mkdtempSync(join(tmpdir(), "indexnow-"));
    const run2 = await runScript(["--prev", prevPath, "--out", out2], { INDEXNOW_FETCH_ORIGIN: second.origin });
    assert.equal(run2.code, 0, run2.output);
    const report2 = JSON.parse(read(join(out2, "report.json")));
    assert.deepEqual(report2.changed, [`${SITE_ORIGIN}/a`]);
    assert.deepEqual(report2.added, [`${SITE_ORIGIN}/new`]);
    assert.deepEqual(report2.removed, [`${SITE_ORIGIN}/gone`]);
    assert.deepEqual(report2.toSubmit.sort(), [`${SITE_ORIGIN}/a`, `${SITE_ORIGIN}/gone`, `${SITE_ORIGIN}/new`]);
    assert.match(run2.output, /Would submit 3 URL/);
    assert.match(run2.output, /Key file verified/);
    assert.match(run2.output, /not canonical\/submittable/);
    assert.doesNotMatch(run2.output, /Attempt 1/, "dry run must not POST");

    // A page that is gone from the sitemap but still answers 200 is NOT submitted as removed.
    const run3 = await runScript(["--mode", "urls", "--urls", `${SITE_ORIGIN}/a ${SITE_ORIGIN}/gone`, "--prev", prevPath, "--out", out2], { INDEXNOW_FETCH_ORIGIN: second.origin });
    assert.equal(run3.code, 0, run3.output); // mode=urls allows an intentional removal
    assert.match(run3.output, /Would submit 2 URL/);

    const run4 = await runScript(["--mode", "initial", "--out", out2], { INDEXNOW_FETCH_ORIGIN: second.origin });
    assert.equal(run4.code, 1, "initial URLs are not live on this fake origin, so it must refuse");
    assert.match(run4.output, /expected 200/);
    assert.match(run4.output, /Nothing was submitted/);
  } finally {
    second.server.close();
  }
});

test("script refuses to submit a site-wide change automatically (cap) unless forced", async () => {
  const count = MAX_AUTO_URLS + 5;
  const paths = Array.from({ length: count }, (_, i) => `/p${i}`);
  const baseline = { version: 1, generatedAt: "2026-11-18T00:00:00Z", origin: SITE_ORIGIN, pages: {} };
  const routes = { "/sitemap.xml": { type: "application/xml", body: sitemapOf(paths) }, [`/${INDEXNOW_KEY}.txt`]: { type: "text/plain", body: INDEXNOW_KEY } };
  for (const p of paths) {
    routes[p] = { body: page({ h1: `now ${p}` }) };
    baseline.pages[`${SITE_ORIGIN}${p}`] = fingerprintHtml(page({ h1: `before ${p}` }));
  }
  const { server, origin } = await fakeOrigin(routes);
  const dir = mkdtempSync(join(tmpdir(), "indexnow-"));
  const prevPath = join(dir, "prev.json");
  writeFileSync(prevPath, JSON.stringify(baseline));
  try {
    const blocked = await runScript(["--prev", prevPath, "--out", dir], { INDEXNOW_FETCH_ORIGIN: origin });
    assert.equal(blocked.code, 1, blocked.output);
    assert.match(blocked.output, new RegExp(`${count} URLs differ from the baseline \\(limit ${MAX_AUTO_URLS}\\)`));
    assert.equal(existsSync(join(dir, "manifest.json")), false);

    const forced = await runScript(["--prev", prevPath, "--out", dir, "--force"], { INDEXNOW_FETCH_ORIGIN: origin });
    assert.equal(forced.code, 0, forced.output);
    assert.match(forced.output, new RegExp(`Would submit ${count} URL`));
  } finally {
    server.close();
  }
});

test("script will not submit when the key file is not live", async () => {
  const { server, origin } = await fakeOrigin({
    "/sitemap.xml": { type: "application/xml", body: sitemapOf(["/a"]) },
    "/a": { body: page({ h1: "A" }) },
  });
  try {
    const out = mkdtempSync(join(tmpdir(), "indexnow-"));
    const run = await runScript(["--mode", "urls", "--urls", `${SITE_ORIGIN}/a`, "--out", out], { INDEXNOW_FETCH_ORIGIN: origin });
    assert.equal(run.code, 1, run.output);
    assert.match(run.output, /Key file .* is not live/);
  } finally {
    server.close();
  }
});

test("script is a read-only dry run when run by hand (no GitHub Actions env)", () => {
  // Pointing at a closed port: it must fail on the sitemap read, never reach the IndexNow API.
  const run = spawnSync(process.execPath, ["scripts/indexnow/submit.mts", "--out", mkdtempSync(join(tmpdir(), "indexnow-"))], {
    env: { ...process.env, GITHUB_ACTIONS: "", INDEXNOW_FETCH_ORIGIN: "http://127.0.0.1:9" },
    encoding: "utf8",
  });
  assert.equal(run.status, 1);
  assert.match(run.stdout, /DRY RUN/);
  assert.match(run.stdout, /Could not read/);
});

// ---------- the live submission path, against a fake IndexNow endpoint ----------

function fakeIndexNow(statuses) {
  const requests = [];
  const server = createServer((req, res) => {
    let body = "";
    req.on("data", (d) => (body += d));
    req.on("end", () => {
      requests.push({ method: req.method, headers: req.headers, body });
      const status = statuses[Math.min(requests.length - 1, statuses.length - 1)];
      res.writeHead(status, { "Content-Type": "text/plain" }).end(status === 200 ? "" : `error ${status}`);
    });
  });
  return new Promise((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve({ server, requests, endpoint: `http://127.0.0.1:${server.address().port}/indexnow` })),
  );
}

/** A site with /a changed relative to the returned baseline, plus the key file. */
async function liveFixture() {
  const origin = await fakeOrigin({
    "/sitemap.xml": { type: "application/xml", body: sitemapOf(["/", "/a", "/b"]) },
    "/": { body: page({ h1: "Home" }) },
    "/a": { body: page({ h1: "A v2" }) },
    "/b": { body: page({ h1: "B" }) },
    [`/${INDEXNOW_KEY}.txt`]: { type: "text/plain", body: INDEXNOW_KEY },
  });
  const baseline = {
    version: 1,
    generatedAt: "2026-11-18T00:00:00Z",
    origin: SITE_ORIGIN,
    pages: {
      [SITE_ORIGIN]: fingerprintHtml(page({ h1: "Home" })),
      [`${SITE_ORIGIN}/a`]: fingerprintHtml(page({ h1: "A v1" })),
      [`${SITE_ORIGIN}/b`]: fingerprintHtml(page({ h1: "B" })),
    },
  };
  const dir = mkdtempSync(join(tmpdir(), "indexnow-"));
  const prev = join(dir, "prev.json");
  writeFileSync(prev, JSON.stringify(baseline));
  return { origin, dir, prev };
}

const liveEnv = (origin, endpoint) => ({
  GITHUB_ACTIONS: "true",
  INDEXNOW_FETCH_ORIGIN: origin,
  INDEXNOW_ENDPOINT_OVERRIDE: endpoint,
  INDEXNOW_RETRY_DELAY_MS: "5",
});

test("live run: POSTs only the changed URL in protocol form, logs the response, advances the baseline, and the next run submits nothing", async () => {
  const fx = await liveFixture();
  const api = await fakeIndexNow([200]);
  try {
    const out = join(fx.dir, "out1");
    const run = await runScript(["--prev", fx.prev, "--out", out], liveEnv(fx.origin.origin, api.endpoint));
    assert.equal(run.code, 0, run.output);
    assert.match(run.output, /LIVE submission/);
    assert.match(run.output, /Attempt 1: HTTP 200, OK: URLs submitted/);

    assert.equal(api.requests.length, 1);
    const [request] = api.requests;
    assert.equal(request.method, "POST");
    assert.match(request.headers["content-type"], /^application\/json/);
    assert.deepEqual(JSON.parse(request.body), {
      host: "www.bbtx.ai",
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: [`${SITE_ORIGIN}/a`],
    });

    const report = JSON.parse(read(join(out, "report.json")));
    assert.equal(report.dryRun, false);
    assert.equal(report.response.status, 200);
    assert.deepEqual(report.toSubmit, [`${SITE_ORIGIN}/a`]);

    // Baseline advanced: a second run against the same site has nothing left to send.
    const manifest = join(out, "manifest.json");
    assert.ok(existsSync(manifest), "a successful live run must write the new baseline");
    const rerun = await runScript(["--prev", manifest, "--out", join(fx.dir, "out2")], liveEnv(fx.origin.origin, api.endpoint));
    assert.equal(rerun.code, 0, rerun.output);
    assert.match(rerun.output, /Nothing to submit/);
    assert.equal(api.requests.length, 1, "unchanged pages must not be submitted again");
    assert.ok(existsSync(join(fx.dir, "out2", "manifest.json")), "an empty run still refreshes the baseline");
  } finally {
    fx.origin.server.close();
    api.server.close();
  }
});

test("live run: a rejected key (403) fails the job loudly and does NOT advance the baseline", async () => {
  const fx = await liveFixture();
  const api = await fakeIndexNow([403]);
  try {
    const out = join(fx.dir, "out");
    const run = await runScript(["--prev", fx.prev, "--out", out], liveEnv(fx.origin.origin, api.endpoint));
    assert.equal(run.code, 1, run.output);
    assert.match(run.output, /HTTP 403, Forbidden: key not valid/);
    assert.match(run.output, /baseline was not advanced/);
    assert.equal(api.requests.length, 1, "a 403 is not transient and must not be retried");
    assert.equal(existsSync(join(out, "manifest.json")), false);
    assert.equal(JSON.parse(read(join(out, "report.json"))).response.status, 403);
  } finally {
    fx.origin.server.close();
    api.server.close();
  }
});

test("live run: rate limiting (429) is retried and then succeeds", async () => {
  const fx = await liveFixture();
  const api = await fakeIndexNow([429, 200]);
  try {
    const out = join(fx.dir, "out");
    const run = await runScript(["--prev", fx.prev, "--out", out], liveEnv(fx.origin.origin, api.endpoint));
    assert.equal(run.code, 0, run.output);
    assert.equal(api.requests.length, 2);
    assert.match(run.output, /Attempt 1: HTTP 429/);
    assert.match(run.output, /Attempt 2: HTTP 200/);
    assert.ok(existsSync(join(out, "manifest.json")));
  } finally {
    fx.origin.server.close();
    api.server.close();
  }
});

test("live run: persistent server errors give up after 3 attempts, fail, and keep the old baseline so the URLs are retried next deploy", async () => {
  const fx = await liveFixture();
  const api = await fakeIndexNow([500]);
  try {
    const out = join(fx.dir, "out");
    const run = await runScript(["--prev", fx.prev, "--out", out], liveEnv(fx.origin.origin, api.endpoint));
    assert.equal(run.code, 1, run.output);
    assert.equal(api.requests.length, 3);
    assert.equal(existsSync(join(out, "manifest.json")), false);
    assert.equal(JSON.parse(read(join(out, "report.json"))).attempts.length, 3);
  } finally {
    fx.origin.server.close();
    api.server.close();
  }
});

test("the endpoint override only accepts loopback, so it can never redirect a real run", () => {
  const run = spawnSync(process.execPath, ["scripts/indexnow/submit.mts", "--out", mkdtempSync(join(tmpdir(), "indexnow-"))], {
    env: { ...process.env, GITHUB_ACTIONS: "true", INDEXNOW_ENDPOINT_OVERRIDE: "https://example.com/indexnow" },
    encoding: "utf8",
  });
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /loopback/);
});

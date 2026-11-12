import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Contract for the committed fallback dataset. When Vercel KV is not
// configured, src/app/api/get-issues/route.ts serves public/issues.json
// verbatim and src/app/page.tsx + QuestCard render it, so every entry
// must carry the Issue shape from src/types/quest.ts. Note the URL is
// the issue's canonical GitHub URL: it can name a renamed org (the
// dataset holds OffchainLabs URLs for prysmaticlabs/prysm rows), so the
// contract pins the URL shape and issue number, not the org string.

const issues = JSON.parse(await readFile(new URL('../public/issues.json', import.meta.url), 'utf8'));
const lastUpdate = JSON.parse(await readFile(new URL('../public/last-update.json', import.meta.url), 'utf8'));

test('fallback dataset is a non-empty array', () => {
  assert.ok(Array.isArray(issues));
  assert.ok(issues.length > 0);
});

test('every entry carries the full Issue shape with the right types', () => {
  for (const i of issues) {
    assert.equal(typeof i.id, 'number', `id of ${i.title}`);
    assert.equal(typeof i.title, 'string');
    assert.ok(i.title.length > 0);
    assert.equal(typeof i.url, 'string');
    assert.equal(typeof i.repository, 'string');
    assert.ok(Array.isArray(i.tags));
    assert.equal(typeof i.created_at, 'string');
    assert.ok(!Number.isNaN(Date.parse(i.created_at)), `created_at of #${i.number}`);
    assert.equal(typeof i.number, 'number');
  }
});

test('repository is an owner/repo pair and ids are unique', () => {
  const ids = new Set();
  for (const i of issues) {
    assert.match(i.repository, /^[^/\s]+\/[^/\s]+$/, i.repository);
    assert.ok(!ids.has(i.id), `duplicate id ${i.id}`);
    ids.add(i.id);
  }
});

test('every url is the GitHub issue URL for its issue number', () => {
  for (const i of issues) {
    assert.ok(i.url.startsWith('https://github.com/'), i.url);
    assert.ok(i.url.endsWith(`/issues/${i.number}`), i.url);
  }
});

test('every entry maps through issueToQuest without losing its title', async () => {
  const { issueToQuest } = await import('../src/types/quest.ts');
  for (const i of issues) {
    const q = issueToQuest(i);
    assert.equal(q.title, i.title);
    assert.equal(q.owner, i.repository.split('/')[0]);
    assert.equal(q.hasBounty, false);
  }
});

test('last-update.json carries a parseable lastUpdated timestamp', () => {
  assert.equal(typeof lastUpdate.lastUpdated, 'string');
  assert.ok(!Number.isNaN(Date.parse(lastUpdate.lastUpdated)));
});

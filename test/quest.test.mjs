import { test } from 'node:test';
import assert from 'node:assert/strict';
import { issueToQuest } from '../src/types/quest.ts';

// issueToQuest is the only Issue -> Quest mapping in the repo
// (src/types/quest.ts); src/app/page.tsx runs every fetched issue
// through it before filtering and rendering.

const base = {
  id: 42,
  title: 'Fix the thing',
  url: 'https://github.com/ethereum/go-ethereum/issues/7',
  repository: 'ethereum/go-ethereum',
  tags: ['ethereum', 'core', 'go'],
  created_at: '2025-01-02T03:04:05Z',
  number: 7,
};

test('passes the issue fields through unchanged', () => {
  const q = issueToQuest(base);
  assert.equal(q.id, 42);
  assert.equal(q.title, 'Fix the thing');
  assert.equal(q.url, base.url);
  assert.equal(q.repository, 'ethereum/go-ethereum');
  assert.equal(q.created_at, base.created_at);
  assert.equal(q.number, 7);
});

test('owner is the part of repository before the slash', () => {
  assert.equal(issueToQuest(base).owner, 'ethereum');
  assert.equal(issueToQuest({ ...base, repository: 'solana-labs/solana' }).owner, 'solana-labs');
});

test('language is derived from the first language tag', () => {
  assert.equal(issueToQuest(base).language, 'Go');
  assert.equal(issueToQuest({ ...base, tags: ['ethereum', 'consensus', 'rust'] }).language, 'Rust');
  assert.equal(issueToQuest({ ...base, tags: ['defi', 'smartcontracts', 'solidity'] }).language, 'Solidity');
});

test('language lookup is case-insensitive on the tag', () => {
  assert.equal(issueToQuest({ ...base, tags: ['Python'] }).language, 'Python');
  assert.equal(issueToQuest({ ...base, tags: ['JAVASCRIPT'] }).language, 'JavaScript');
});

test('language is undefined when no tag names a known language', () => {
  assert.equal(issueToQuest({ ...base, tags: ['ethereum', 'core'] }).language, undefined);
  assert.equal(issueToQuest({ ...base, tags: [] }).language, undefined);
});

test('labels mirror the tags array', () => {
  const q = issueToQuest(base);
  assert.deepEqual(q.labels, ['ethereum', 'core', 'go']);
});

test('hasBounty is always false (no bounty data source exists yet)', () => {
  assert.equal(issueToQuest(base).hasBounty, false);
});

test('optional stars and forks survive the mapping', () => {
  const q = issueToQuest({ ...base, stars: 1200, forks: 34 });
  assert.equal(q.stars, 1200);
  assert.equal(q.forks, 34);
});

test('cpp and c tags map to C++ and C', () => {
  assert.equal(issueToQuest({ ...base, tags: ['bitcoin', 'core', 'cpp'] }).language, 'C++');
  assert.equal(issueToQuest({ ...base, tags: ['bitcoin', 'lightning', 'c'] }).language, 'C');
});

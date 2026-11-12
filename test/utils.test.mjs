import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cn } from '../src/lib/utils.ts';

// cn (src/lib/utils.ts) is the class-name helper every shadcn/ui
// component under src/components/ui is built on: clsx for
// conditionals, tailwind-merge for conflicting utilities.

test('joins plain class names with a space', () => {
  assert.equal(cn('flex', 'items-center'), 'flex items-center');
});

test('drops falsy conditional classes', () => {
  assert.equal(cn('base', false, null, undefined, ''), 'base');
  assert.equal(cn('base', true && 'on', false && 'off'), 'base on');
});

test('supports clsx array and object syntax', () => {
  assert.equal(cn(['a', 'b'], { c: true, d: false }), 'a b c');
});

test('later conflicting tailwind utility wins', () => {
  assert.equal(cn('p-2', 'p-4'), 'p-4');
  assert.equal(cn('text-left', 'text-center'), 'text-center');
});

test('non-conflicting utilities are all kept', () => {
  assert.equal(cn('p-2', 'm-4', 'flex'), 'p-2 m-4 flex');
});

test('empty input gives an empty string', () => {
  assert.equal(cn(), '');
});

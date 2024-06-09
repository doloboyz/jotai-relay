import * as src from '../src/index.js';
import { expect, test } from 'vitest';

test('should export functions', () => {
  expect(src.environmentAtom).toBeDefined();
  expect(src.atomWithQuery).toBeDefined();
  expect(src.atomWithMutation).toBeDefined();
  expect(src.atomWithSubscription).toBeDefined();
});

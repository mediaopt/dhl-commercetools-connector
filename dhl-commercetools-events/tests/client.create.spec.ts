import { describe, expect, test } from '@jest/globals';
import { createApiRoot } from '../src/client/create.client';
describe('Testing create client call', () => {
  test('test getProject', async () => {
    const root = await createApiRoot();
    expect(root).toBeDefined();
  });
});

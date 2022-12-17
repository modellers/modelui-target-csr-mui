/**
 * MemoryStorage tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './MemoryStorage'
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('Some test', () => {
  test('Test', () => { });
});

/*
describe('MemoryStorage protocol', () => {
  const tests = createComponentClassTests(
    config,
    [
      'submit',
      'replace',
      'push',
      'push_front',
      'delete',
      'pop',
      'pop_front',
      'select',
      'clear'
    ], [
    'changed',
    'replacing',
    'replaced',
    'submitted',
    'deleted',
    'pushing',
    'pushed',
    'selected',
    'deselected',
    'clearing',
    'cleared'
  ]
  );
  tests.forEach((t) => { test(t.title, t.test); });
});
/*
describe('MemoryStorage register', () => {
  const tests = createComponentRegisterTests(
    'memory',
    MemoryStorage,
    triggers,
    events,
    config,
    [
      'submit',
      'replace',
      'push',
      'push_front',
      'delete',
      'pop',
      'pop_front',
      'select',
      'clear'
    ], [
    'changed',
    'replacing',
    'replaced',
    'submitted',
    'deleted',
    'pushing',
    'pushed',
    'selected',
    'deselected',
    'clearing',
    'cleared'
  ]
  );
  tests.forEach((t) => { test(t.title, t.test); });
});
*/
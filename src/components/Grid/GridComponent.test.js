/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */
import { Grid } from './Grid';
import { events, triggers, config } from './GridComponent';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('Some test', () => {
  test('Test', () => { });
});

/*
describe('GridComponent protocol', () => {
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

describe('Grid register', () => {
  const tests = createComponentRegisterTests(
    'grid',
    Grid,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});
*/
/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */
import { GridColumn } from './Grid';
import { events, triggers, config } from './GridColumnComponent';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('GridColumnComponent protocol', () => {
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

describe('GridColumn register', () => {
  const tests = createComponentRegisterTests(
    'grid-columns',
    GridColumn,
    triggers,
    events,
    config,
    { 'grid-column': {} }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

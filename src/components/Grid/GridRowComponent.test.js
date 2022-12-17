/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { GridRow } from './Grid';
import { events, triggers, config } from './GridRowComponent';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('GridRowComponent protocol', () => {
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

describe('GridRow register', () => {
  const tests = createComponentRegisterTests(
    'grid-rows',
    GridRow,
    triggers,
    events,
    config,
    { 'grid-row': {} }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

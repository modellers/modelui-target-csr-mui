/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { Tabs } from './Grid';
import { events, triggers, config } from './TabsComponent';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('TabsComponent protocol', () => {
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
  ]);
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('Tabs register', () => {
  const tests = createComponentRegisterTests(
    'tabs',
    Tabs,
    triggers,
    events,
    config,
    { tab: {} }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

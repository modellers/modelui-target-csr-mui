/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './CardComponent'
import { Card } from './Card'
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('CardComponent protocol', () => {
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

describe('Card register', () => {
  const tests = createComponentRegisterTests(
    'cards',
    Card,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

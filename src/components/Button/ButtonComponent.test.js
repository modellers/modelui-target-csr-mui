/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { config, triggers, events } from './ButtonComponent'
import { Button } from './Button'
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('ButtonComponent protocol', () => {
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

describe('Button register', () => {
  const tests = createComponentRegisterTests(
    'buttons',
    Button,
    triggers,
    events,
    config,
    { 'button': {} }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './TextComponent';
import { Text } from './Text';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('TextComponent protocol', () => {
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

describe('TextInput register', () => {
  const tests = createComponentRegisterTests(
    'texts',
    Text,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

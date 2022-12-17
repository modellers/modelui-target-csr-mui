/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './ImageComponent'
import { Image } from './Image'
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('ImageComponent protocol', () => {
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

describe('Image register', () => {
  const tests = createComponentRegisterTests(
    'images',
    Image,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { Accordion } from './Grid';
import { events, triggers, config } from './AccordionComponent';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('AccordionComponent protocol', () => {
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

describe('Accordion register', () => {
  const tests = createComponentRegisterTests(
    'accordion',
    Accordion,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

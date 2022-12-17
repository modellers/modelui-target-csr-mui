/**
 * DialogComponent tests
 * Testing DD events and actions integrety
 */

import { DialogComponent, events, triggers, config } from './DialogComponent'
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('DialogComponent protocol', () => {
  const tests = createComponentClassTests(
    config,
    ['show', 'close'],
    ['showing', 'closed', 'confirmed']
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('Dialog register', () => {
  const tests = createComponentRegisterTests(
    'dialog',
    DialogComponent,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

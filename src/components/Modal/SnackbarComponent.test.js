/**
 * MenuComponent tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './SnackbarComponent'
import { PopupToaster } from './Modal'
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('SnackbarComponent protocol', () => {
  //const tests = createComponentClassTests('test_MenuComponent', MenuComponent, {...triggers, ...{'show':{}, 'hide':{}}}, events);
  const tests = createComponentClassTests(
    config,
    [
      'show',
      'close'
    ], [
    'showing',
    'closed',
    'closing'
  ]
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('Snackbar register', () => {
  //const tests = createComponentClassTests('test_MenuComponent', MenuComponent, {...triggers, ...{'show':{}, 'hide':{}}}, events);
  const tests = createComponentRegisterTests(
    'popup-toaster',
    PopupToaster,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});
/**
 * MenuComponent tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './SnackbarComponent'
import { PopupToaster } from './Modal'
// util
import { util } from 'modelui-core-runtime';
import { layout } from 'modelui-core-runtime'
import registerComponents from '../Components';
import renderer from 'react-test-renderer';

describe('SnackbarComponent protocol', () => {
  const tests = util.TestUtil.createComponentClassTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    renderer,
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
  const tests = util.TestUtil.createComponentRegisterTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    'popup-toaster',
    PopupToaster,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});
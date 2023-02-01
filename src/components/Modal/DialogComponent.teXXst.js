/**
 * DialogComponent tests
 * Testing DD events and actions integrety
 */

import { DialogComponent, events, triggers, config } from './DialogComponent'
// util
import { util } from 'modelui-core-runtime';
import { layout } from 'modelui-core-runtime'
import registerComponents from '../Components';
import renderer from 'react-test-renderer';

describe('DialogComponent protocol', () => {
  const tests = util.TestUtil.createComponentClassTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    renderer,
    config,
    ['show', 'close'],
    ['showing', 'closed', 'confirmed']
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('Dialog register', () => {
  const tests = util.TestUtil.createComponentRegisterTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    'dialog',
    DialogComponent,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

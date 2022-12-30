/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { Tabs } from './Grid';
import { events, triggers, config } from './TabsComponent';
// utils
import { util } from 'modelui-core-runtime';
import { layout } from 'modelui-core-runtime'
import registerComponents from '../Components';
import renderer from 'react-test-renderer';

describe('TabsComponent protocol', () => {
  const tests = util.TestUtil.createComponentClassTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    renderer,
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
  const tests = util.TestUtil.createComponentRegisterTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    'tabs',
    Tabs,
    triggers,
    events,
    config,
    { tab: {} }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

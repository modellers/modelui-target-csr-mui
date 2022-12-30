/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { config, triggers, events } from './ButtonComponent'
import { Button } from './Button'

import { util } from 'modelui-core-runtime';
import { layout } from 'modelui-core-runtime'
import registerComponents from '../Components';
import renderer from 'react-test-renderer';

describe('ButtonComponent protocol', () => {
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
  ]
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('Button register', () => {
  const tests = util.TestUtil.createComponentRegisterTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    'buttons',
    Button,
    triggers,
    events,
    config,
    { 'button': {} }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

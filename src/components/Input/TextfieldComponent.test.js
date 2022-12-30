/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './TextfieldComponent';
import { Textfield } from './Input';
// util
import { util } from 'modelui-core-runtime';
import { layout } from 'modelui-core-runtime'
import registerComponents from '../Components';
import renderer from 'react-test-renderer';

describe('TextfieldComponent protocol', () => {
  const tests = util.TestUtil.createComponentClassTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    renderer,
    config,
    [
      'submit',
      'enable',
      'disable',
      'clear',
      'populate',
      'replace',
    ],
    [
      'changed',
      'enabled',
      'disabled',
      'submitted',
      'cleared',
      'populated',
      'replaced',
      'invalidated',
      'validated'
    ]);
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('Textfield register', () => {
  const tests = util.TestUtil.createComponentRegisterTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    'textfield',
    Textfield,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

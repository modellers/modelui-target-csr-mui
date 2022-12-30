/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { events, triggers, config } from './AvatarComponent'
import { Avatar } from './Avatar'
import { util } from 'modelui-core-runtime';
import { layout } from 'modelui-core-runtime'
import registerComponents from '../Components';
import renderer from 'react-test-renderer';

describe('AvatarComponent protocol', () => {
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


describe('Avatars register', () => {
  const tests = util.TestUtil.createComponentRegisterTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    'avatars',
    Avatar,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

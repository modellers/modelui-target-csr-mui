/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { Table } from './Table'
import { events, triggers, config } from './TableComponent';
// utils
import { util } from 'modelui-core-runtime';
import { layout } from 'modelui-core-runtime'
import registerComponents from '../Components';
import renderer from 'react-test-renderer';


describe('TableComponent protocol', () => {
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
  ], null, { items: [] }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('Table register', () => {
  const tests = util.TestUtil.createComponentRegisterTests(
    layout.Manager.ComponentManager.getInstance(),
    registerComponents,
    'table',
    Table,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

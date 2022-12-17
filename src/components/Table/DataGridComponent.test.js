/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import { DataGrid } from './Table'
import { events, triggers, config } from './DataGridComponent';
import { createComponentClassTests, createComponentRegisterTests } from '../../test/utils/TestUtil';

describe('DataGridComponent protocol', () => {
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
  ], null, { items: [] }
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

describe('DataGrid register', () => {
  const tests = createComponentRegisterTests(
    'datagrid',
    DataGrid,
    triggers,
    events,
    config,
    {}
  );
  tests.forEach((t) => { test(t.title, t.test); });
});

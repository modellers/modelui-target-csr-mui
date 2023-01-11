/**
 * ListComponent tests
 * Testing DD events and actions integrety
 */

import registerComponents from './Components';
import { layout } from 'modelui-core-runtime';

describe('Components ', () => {
  test('Registering should all have events and actions', (done) => {
    // check for events and actions
    // const comp = ComponentManager.getInstance().getComponents();
    const _component_manager = layout.Manager.ComponentManager.getInstance();
    registerComponents(_component_manager);
    const inventory = _component_manager.collectComponentInventory();
    const buttons = inventory['buttons'];

    expect(Object.keys(buttons.events).length).toBeGreaterThan(4);
    expect(Object.keys(buttons.actions).length).toBeGreaterThan(4);

    // test all events and actions
    Object.values(inventory).forEach((item) => {
      if (item.schema["x-layout"] === 'component') {
        const events_cnt = Object.keys(item.events).length;
        const actions_cnt = Object.keys(item.actions).length;
        if (events_cnt === 0) { console.info(item); }
        if (actions_cnt === 0) { console.info(item); }
        expect(events_cnt).toBeGreaterThan(0);
        expect(actions_cnt).toBeGreaterThan(0);
      }
    });

    done()
  });
});

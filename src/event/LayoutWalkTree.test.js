import { walkLayout } from '../event/StateManager';
import { layout } from '../test/data/ui-test-layout';

describe('LayoutWalkTree test', () => {
  let objectCollection = null;

  beforeEach(() => {

  });

  test('layoutWalk test', () => {
    const correct_ids = ['299a7b04670b9da7216e7162ced77938b9b2e57d', 'f92ec0aa31e145679d3a7d81a862c5b055f88946', '6f7ed12aaab9064442eab644d23dc1499bb2465d', '6f7ed12aaab9064442eab644d23dc1499bb2465T', '6f7ed12aaab9064442eab644d23dc1499bb2465f', '6f7ed12aaab9064442eab644d23dc1499bb2465K', '6f7ed12aaab9064442eab644d23dc1499bb2465L', '6f7ed12aaab9064442eab644d23dc1499bb2465M']
    const result_ids = [];
    const result_types = [];

    walkLayout(layout['root'], (layt) => {
      result_ids.push(layt.id);
      result_types.push(layt.type);
    });

    // console.info(result_types)

    expect(result_ids).toEqual(expect.arrayContaining(correct_ids))
    expect(result_types.indexOf('view') !== -1).toBeTruthy();
    expect(result_types.indexOf('grid') !== -1).toBeTruthy();
    expect(result_types.indexOf('buttons') !== -1).toBeTruthy();
    expect(result_types.indexOf('table') !== -1).toBeTruthy();
  })


});

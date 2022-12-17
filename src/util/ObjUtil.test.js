/**
 * ObjUtil tests
 * Testing common dependency functions
 */

import { md5 } from './ObjUtil';

describe('DropdownComponent', () => {
  test('Test hasing function', () => {
    expect(md5("12345")).toEqual("24d16f92cbfb5e813cff1f3d980b0ca13c23a066");
  });
});

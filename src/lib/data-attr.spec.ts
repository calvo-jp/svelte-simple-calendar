import { dataAttr } from './data-attr.js';

test('dataAttr', () => {
  expect(dataAttr(false)).toBeUndefined();
  expect(dataAttr(true)).toEqual('');
});

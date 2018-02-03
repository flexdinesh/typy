import { assert } from 'chai';
import { getNestedObject } from '../src/util';

describe('Nested Object/Keys Check', () => {
  it('should return nested object if exists', () => {
    const mockObj = { goodKey: 'hello' };
    assert(getNestedObject(mockObj, 'goodKey') !== undefined);
    const mockDeepObj = {
      nestedKey: {
        goodKey: 'hello'
      }
    };
    assert(getNestedObject(mockDeepObj, 'nestedKey.goodKey') === mockDeepObj.nestedKey.goodKey);
    assert(getNestedObject(mockDeepObj, 'nestedKey.goodKey') !== undefined);
  });

  it('should return undefined if nested object does not exist', () => {
    const mockObj = { goodKey: 'hello' };
    assert(getNestedObject(mockObj, 'goodKey.badkey') === undefined);
    const mockDeepObj = {
      nestedKey: {
        goodKey: 'hello'
      }
    };
    assert(getNestedObject(mockDeepObj, 'badKey.goodKey') === undefined);
    assert(getNestedObject(mockDeepObj, 'goodKey.badKey') === undefined);
    assert(getNestedObject(mockDeepObj, 'nestedKey.badKey') === undefined);
  });

  it('monkey test nested object', () => {
    const mockObj = { goodKey: 'hello' };
    assert(getNestedObject(mockObj, 'goodKey,badkey') === undefined);
    assert(getNestedObject(mockObj, null) === undefined);
    assert(getNestedObject(mockObj, 1) === undefined);
    assert(getNestedObject(mockObj, 0) === undefined);
    assert(getNestedObject(mockObj, {}) === undefined);
  });
});

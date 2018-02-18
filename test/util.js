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

  it('should return nested object when array element is in path', () => {
    let mockObj = {
      nestedArray: [
        { goodKey: 'hello one' },
        { goodKey: 'hello two' }
      ]
    };
    assert(getNestedObject(mockObj, 'nestedArray[0].goodKey') === 'hello one');
    assert(getNestedObject(mockObj, 'nestedArray[1].goodKey') === 'hello two');

    mockObj = {
      nestedArray: ['a', 'b']
    };
    assert(getNestedObject(mockObj, 'nestedArray[0]') === 'a');
    assert(getNestedObject(mockObj, 'nestedArray[1]') === 'b');
  });

  it('should return undefined when array element in path does not exist', () => {
    const mockObj = {
      nestedArray: [
        { goodKey: 'hello one' },
        { goodKey: 'hello two' }
      ]
    };
    assert(getNestedObject(mockObj, 'badArray[0].goodKey') === undefined);
    assert(getNestedObject(mockObj, 'nestedArray[1].goodKey.badkey') === undefined);
    assert(getNestedObject(mockObj, 'nestedArray[2].goodKey') === undefined);
    assert(getNestedObject(mockObj, 'nestedArray.goodKey') === undefined);
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

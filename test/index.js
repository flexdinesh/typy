import { assert } from 'chai';
import is from '../src';

describe('Is Check', () => {
  describe('Undefined/Undefined Check', () => {
    const obj = {
      goodKey: 'hooray'
    };
    it('should test if object is undefined', () => {
      assert(is(obj.badKey).isUndefined === true, 'Undefined check didn\'t work :(');
      assert(is(obj.badKey).isDefined === false);
    });
    it('should test if object is defined', () => {
      assert(is(obj.goodKey).isDefined === true, 'Defined check didn\'t work :(');
      assert(is(obj.goodKey).isUndefined === false);
    });
  });

  describe('Null Check', () => {
    it('should test if object is null', () => {
      const obj = null;
      assert(is(obj).isNull === true, 'Null check didn\'t work :(');
    });
  });
});

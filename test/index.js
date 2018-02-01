import { assert } from 'chai';
import check from '../src';

describe('Defined/Undefined', () => {
  const obj = {
    goodKey: 'hooray'
  };

  it('should test if object is defined', () => {
    assert(check(obj.goodKey).isDefined === true, 'Defined check didn\'t work :(');
    assert(check(obj.goodKey).isUndefined === false);
  });

  it('should test if object is undefined', () => {
    assert(check(obj.badKey).isUndefined === true, 'Undefined check didn\'t work :(');
    assert(check(obj.badKey).isDefined === false);
  });
});

describe('Null', () => {
  it('should test if object is null', () => {
    const obj = null;
    assert(check(obj).isNull === true, 'Null check didn\'t work :(');
  });
});

describe('Null or Undefined', () => {
  it('should test if object is null', () => {
    const nullObj = null;
    assert(check(nullObj).isNullOrUndefined === true, 'NullOrUndefined check didn\'t work :(');
    const obj = {
      goodKey: 'hooray'
    };
    assert(check(obj.badKey).isNullOrUndefined === true, 'NullOrUndefined check didn\'t work :(');
  });
});

describe('Truthy/Falsy', () => {
  it('should test if object is truthy', () => {
    const truthyValues = ['hey', 11, {}, {yo: 'yoyo'}, true, [], [1, 2]];
    for (let value of truthyValues) {
      assert(check(value).isTruthy === true, 'Truthy check didn\'t work :(');
      assert(check(value).isFalsy === false, 'Truthy check didn\'t work :(');
    }
  });

  it('should test if object is falsy', () => {
    const mockObj = {goodKey: 'hello'};
    const falsyValues = ['', 0, null, mockObj.badKey, false, NaN];
    for (let value of falsyValues) {
      assert(check(value).isFalsy === true, 'Falsy check didn\'t work :(');
      assert(check(value).isTruthy === false, 'Falsy check didn\'t work :(');
    }
  });
});

describe('Type', () => {
  it('should test if type is object', () => {
    const obj = {};
    assert(check(obj).isObject === true, 'Object check didn\'t work :(');
  });

  it('should test if object is empty', () => {
    const obj = {};
    assert(check(obj).isEmptyObject === true, 'Empty Object check didn\'t work :(');
  });

  it('should test if type is string', () => {
    const obj = 'hello';
    assert(check(obj).isString === true, 'String check didn\'t work :(');
  });

  it('should test if string is empty string', () => {
    const obj = '';
    assert(check(obj).isEmptyString === true, 'EmptyString check didn\'t work :(');
  });

  it('should test if type is Number', () => {
    const obj = 22;
    assert(check(obj).isNumber === true, 'Number check didn\'t work :(');
    assert(check(obj).isInt === true, 'Number check didn\'t work :(');
  });

  it('should test if Number is Positive/Negative Integer', () => {
    const two = 2;
    assert(check(two).isPositiveInt === true, 'Positive Integer check didn\'t work :(');
    assert(check(two).isNegativeInt === false, 'Positive Integer check didn\'t work :(');
    const zero = 0;
    assert(check(zero).isPositiveInt === false, 'Positive Integer check didn\'t work :(');
    assert(check(zero).isNegativeInt === false, 'Positive Integer check didn\'t work :(');
    const minusTwo = -2;
    assert(check(minusTwo).isPositiveInt === false, 'Positive Integer check didn\'t work :(');
    assert(check(minusTwo).isNegativeInt === true, 'Positive Integer check didn\'t work :(');
  });

  it('should test if type is Boolean', () => {
    const trueObj = true;
    assert(check(trueObj).isBoolean === true, 'Boolean check didn\'t work :(');
    const falseObj = false;
    assert(check(falseObj).isBoolean === true, 'Boolean check didn\'t work :(');
  });

  it('should test if object is true', () => {
    const obj = true;
    assert(check(obj).isTrue === true, 'True check didn\'t work :(');
  });

  it('should test if object is false', () => {
    const obj = false;
    assert(check(obj).isFalse === true, 'True check didn\'t work :(');
  });

  it('should test if type is Array', () => {
    const obj = ['Howdy!'];
    assert(check(obj).isArray === true, 'Array check didn\'t work :(');
  });

  it('should test if Array is Empty Array', () => {
    const obj = [];
    assert(check(obj).isEmptyArray === true, 'Empty Array check didn\'t work :(');
  });

  it('should test if type is Function', () => {
    const func = () => {};
    assert(check(func).isFunction === true, 'Function check didn\'t work :(');
  });

});

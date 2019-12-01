import t, { Schema, addCustomTypes } from '../src/index'; // eslint-disable-line import/no-named-as-default

describe('Typy', () => {
  describe('Defined/Undefined', () => {
    const obj = {
      goodKey: 'hooray'
    };

    test('should test if object/key is defined', () => {
      expect(t(obj.goodKey).isDefined === true).toBeTruthy();
      expect(t(obj.goodKey).isUndefined === false).toBeTruthy();
    });

    test('should test if nested object/key is defined', () => {
      const deepObj = {
        nestedKey: {
          goodKey: 'hello',
          numberKey: 10,
          zeroKey: 0,
          objKey: {}
        }
      };
      expect(t(deepObj, 'nestedKey.goodKey').isDefined === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.goodKey').isUndefined === false).toBeTruthy();
      expect(t(deepObj, 'nestedKey.goodKey').isString === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.numberKey').isNumber === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.numberKey').isTruthy === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.numberKey').isFalsy === false).toBeTruthy();
      expect(t(deepObj, 'nestedKey.zeroKey').isNumber === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.zeroKey').isTruthy === false).toBeTruthy();
      expect(t(deepObj, 'nestedKey.zeroKey').isFalsy === true).toBeTruthy();
      expect(t(deepObj.nestedKey).isDefined === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey').isDefined === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.objKey').isDefined === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.objKey').isUndefined === false).toBeTruthy();
      expect(t(deepObj, 'nestedKey.objKey').isObject === true).toBeTruthy();
      expect(t(deepObj, 'nestedKey.objKey').isFunction === false).toBeTruthy();
      expect(t(deepObj, 'nestedKey.objKey').isArray === false).toBeTruthy();
    });

    test('should test if object/key is undefined', () => {
      expect(t(obj.badKey).isUndefined === true).toBeTruthy();
      expect(t(obj.badKey).isDefined === false).toBeTruthy();
    });

    test('should test if nested object/key is undefined', () => {
      expect(t(obj, 'goodKey.badKey').isUndefined === true).toBeTruthy();
      expect(t(obj, 'badKey.superBadKey').isUndefined === true).toBeTruthy();
      expect(t(obj, 'badKey.superBadKey').isDefined === false).toBeTruthy();
    });
  });

  describe('Null', () => {
    test('should test if object is null', () => {
      const obj = null;
      expect(t(obj).isNull === true).toBeTruthy();
    });
  });

  describe('Null or Undefined', () => {
    test('should test if object is null', () => {
      const nullObj = null;
      expect(t(nullObj).isNullOrUndefined === true).toBeTruthy();
      const obj = {
        goodKey: 'hooray'
      };
      expect(t(obj.badKey).isNullOrUndefined === true).toBeTruthy();

      expect(t('hello').isNullOrUndefined === false).toBeTruthy();
      expect(t(false).isNullOrUndefined === false).toBeTruthy();
      expect(t(22).isNullOrUndefined === false).toBeTruthy();
      expect(t([]).isNullOrUndefined === false).toBeTruthy();
      expect(t({}).isNullOrUndefined === false).toBeTruthy();
    });
  });

  describe('Truthy/Falsy', () => {
    test('should test if object is truthy', () => {
      const truthyValues = ['hey', 11, {}, { yo: 'yoyo' }, true, [], [1, 2]];
      truthyValues.map((value) => {
        expect(t(value).isTruthy === true).toBeTruthy();
        expect(t(value).isFalsy === false).toBeTruthy();
        return value;
      });
    });

    test('should test if object is deep truthy', () => {
      const deepTruthyObj = { goodKey: 'hello' };
      const deepNonTruthyObj = { goodKey: 'hello', badKey: null };
      const nullObj = null;
      expect(t(deepTruthyObj).isDeepTruthy === true).toBeTruthy();
      expect(t(deepNonTruthyObj).isDeepTruthy === false).toBeTruthy();
      expect(t(nullObj).isDeepTruthy === false).toBeTruthy();
    });

    test('should test if object is falsy', () => {
      const mockObj = { goodKey: 'hello' };
      const falsyValues = ['', 0, null, mockObj.badKey, false, NaN];
      falsyValues.map((value) => {
        expect(t(value).isFalsy === true).toBeTruthy();
        expect(t(value).isTruthy === false).toBeTruthy();
        return value;
      });
    });
  });

  describe('Type', () => {
    test('should test if type is object', () => {
      const obj = {};
      expect(t(obj).isObject === true).toBeTruthy();
    });

    test('should test if object is empty', () => {
      const obj = {};
      expect(t(obj).isEmptyObject === true).toBeTruthy();

      expect(t('hello').isEmptyObject === false).toBeTruthy();
      expect(t(false).isEmptyObject === false).toBeTruthy();
      expect(t(22).isEmptyObject === false).toBeTruthy();
      expect(t([]).isEmptyObject === false).toBeTruthy();
    });

    test('should test if type is string', () => {
      const obj = 'hello';
      expect(t(obj).isString === true).toBeTruthy();
    });

    test('should test if string is empty string', () => {
      const obj = '';
      expect(t(obj).isEmptyString === true).toBeTruthy();

      expect(t('hello').isEmptyString === false).toBeTruthy();
      expect(t(false).isEmptyString === false).toBeTruthy();
      expect(t(22).isEmptyString === false).toBeTruthy();
      expect(t([]).isEmptyString === false).toBeTruthy();
      expect(t({}).isEmptyString === false).toBeTruthy();
    });

    test('should test if type is Number', () => {
      let num = 22;
      expect(t(num).isNumber === true).toBeTruthy();
      num = -22;
      expect(t(num).isNumber === true).toBeTruthy();
      num = 0;
      expect(t(num).isNumber === true).toBeTruthy();
      num = 22.345;
      expect(t(num).isNumber === true).toBeTruthy();
      num = 'number';
      expect(t(num).isNumber === false).toBeTruthy();
    });

    test('should test if type is Boolean', () => {
      const trueObj = true;
      expect(t(trueObj).isBoolean === true).toBeTruthy();
      const falseObj = false;
      expect(t(falseObj).isBoolean === true).toBeTruthy();
    });

    test('should test if object is true', () => {
      const obj = true;
      expect(t(obj).isTrue === true).toBeTruthy();

      expect(t('hello').isTrue === false).toBeTruthy();
      expect(t(false).isNullOrUndefined === false).toBeTruthy();
      expect(t(22).isTrue === false).toBeTruthy();
      expect(t([]).isTrue === false).toBeTruthy();
      expect(t({}).isTrue === false).toBeTruthy();
    });

    test('should test if object is false', () => {
      const obj = false;
      expect(t(obj).isFalse === true).toBeTruthy();

      expect(t('hello').isFalse === false).toBeTruthy();
      expect(t(true).isFalse === false).toBeTruthy();
      expect(t(22).isFalse === false).toBeTruthy();
      expect(t([]).isFalse === false).toBeTruthy();
      expect(t({}).isFalse === false).toBeTruthy();
    });

    test('should test if type is Array', () => {
      const obj = ['Howdy!'];
      expect(t(obj).isArray === true).toBeTruthy();
      expect(t(obj).isObject === false).toBeTruthy();
    });

    test('should test if Array is Empty Array', () => {
      const obj = [];
      expect(t(obj).isEmptyArray === true).toBeTruthy();

      expect(t('').isEmptyArray === false).toBeTruthy();
      expect(t(false).isEmptyArray === false).toBeTruthy();
      expect(t(22).isEmptyArray === false).toBeTruthy();
      expect(t({}).isEmptyArray === false).toBeTruthy();
    });

    test('should test if type is Function', () => {
      const func = () => {};
      expect(t(func).isFunction === true).toBeTruthy();
    });

    test('should test if type is Date', () => {
      const date = new Date();
      expect(t(date).isDate === true).toBeTruthy();
    });

    test('should test if type is Symbol', () => {
      const mySymbol = Symbol('someSymbol');
      expect(t(mySymbol).isSymbol === true).toBeTruthy();
      expect(t(Object(mySymbol)).isSymbol === true).toBeTruthy();

      expect(t('Hello World').isSymbol === false).toBeTruthy();
      expect(t({}).isSymbol === false).toBeTruthy();
      expect(t([]).isSymbol === false).toBeTruthy();
      expect(t(23).isSymbol === false).toBeTruthy();
    });
  });

  describe('Safe Object', () => {
    const deepObj = {
      nestedKey: {
        goodKey: 'hello',
        numberKey: 10,
        zeroKey: 0,
        objKey: {}
      }
    };

    test('should return the object if found in path', () => {
      expect(t(deepObj).safeObject).toEqual(deepObj);
      expect(t(deepObj.nestedKey).safeObject).toEqual(deepObj.nestedKey);
      expect(t(deepObj, 'nestedKey').safeObject).toEqual(deepObj.nestedKey);
      expect(t(deepObj.nestedKey.goodKey).safeObject).toEqual(deepObj.nestedKey.goodKey);
      expect(t(deepObj, 'nestedKey.goodKey').safeObject).toEqual(deepObj.nestedKey.goodKey);
    });

    test('should not throw if object not found in path', () => {
      expect(t(deepObj, 'badkey').safeObject).toEqual(undefined);
      expect(t(deepObj, 'badKey.goodKey').safeObject).toEqual(undefined);

      expect(t(deepObj, 'badkey').safeObjectOrEmpty).toEqual({});
      expect(t(deepObj, 'badKey.goodKey').safeObjectOrEmpty).toEqual({});
    });
  });

  describe('Safe Object Or Empty', () => {
    const deepObj = {
      nestedKey: {
        goodKey: 'hello',
        numberKey: 10,
        zeroKey: 0,
        objKey: {}
      }
    };

    test('should return the object if found in path', () => {
      expect(t(deepObj).safeObjectOrEmpty).toEqual(deepObj);
      expect(t(deepObj.nestedKey).safeObjectOrEmpty).toEqual(deepObj.nestedKey);
      expect(t(deepObj, 'nestedKey').safeObjectOrEmpty).toEqual(deepObj.nestedKey);
      expect(t(deepObj.nestedKey.goodKey).safeObjectOrEmpty).toEqual(deepObj.nestedKey.goodKey);
      expect(t(deepObj, 'nestedKey.goodKey').safeObjectOrEmpty).toEqual(deepObj.nestedKey.goodKey);
    });

    test('should return an empty object if object not found in path', () => {
      expect(t(deepObj, 'badkey').safeObjectOrEmpty).toEqual({});
      expect(t(deepObj, 'badKey.goodKey').safeObjectOrEmpty).toEqual({});
      expect(t(deepObj, 'goodKey.goodKey').safeObjectOrEmpty).toEqual({});
    });
  });

  describe('Safe String', () => {
    test('should return the string if type is string', () => {
      const str = 'hello there';
      expect(t(str).safeString === str).toBeTruthy();
    });

    test('should return empty string if type is not string', () => {
      let obj = null;
      expect(t(obj).safeString === '').toBeTruthy();
      obj = 22;
      expect(t(obj).safeString === '').toBeTruthy();
      obj = {};
      expect(t(obj).safeString === '').toBeTruthy();
      obj = undefined;
      expect(t(obj).safeString === '').toBeTruthy();
      obj = [];
      expect(t(obj).safeString === '').toBeTruthy();
      expect(t(obj.badKey).safeString === '').toBeTruthy();
    });
  });

  describe('Safe Number', () => {
    test('should return the number if type is number', () => {
      const num = 22;
      expect(t(num).safeNumber === num).toBeTruthy();
    });

    test('should return 0 if type is not Number', () => {
      let obj = null;
      expect(t(obj).safeNumber === 0).toBeTruthy();
      obj = 'str';
      expect(t(obj).safeNumber === 0).toBeTruthy();
      obj = {};
      expect(t(obj).safeNumber === 0).toBeTruthy();
      obj = undefined;
      expect(t(obj).safeNumber === 0).toBeTruthy();
      obj = [];
      expect(t(obj).safeNumber === 0).toBeTruthy();
      expect(t(obj.badKey).safeNumber === 0).toBeTruthy();
    });
  });

  describe('Safe Boolean', () => {
    test('should return the boolean if type is boolean', () => {
      const bool = true;
      expect(t(bool).safeBoolean === true).toBeTruthy();
    });

    test('should return 0 if type is not Number', () => {
      let obj = null;
      expect(t(obj).safeBoolean === false).toBeTruthy();
      obj = 'str';
      expect(t(obj).safeBoolean === false).toBeTruthy();
      obj = {};
      expect(t(obj).safeBoolean === false).toBeTruthy();
      obj = undefined;
      expect(t(obj).safeBoolean === false).toBeTruthy();
      obj = [];
      expect(t(obj).safeBoolean === false).toBeTruthy();
      expect(t(obj.badKey).safeBoolean === false).toBeTruthy();
    });
  });

  describe('Safe Function', () => {
    test('should return the function if type is function', () => {
      const func = () => {};
      expect(t(func).safeFunction === func).toBeTruthy();
    });

    test('should return () => {} if type is not function', () => {
      let obj = null;
      expect(typeof t(obj).safeFunction === 'function').toBeTruthy();
      obj = 'str';
      expect(typeof t(obj).safeFunction === 'function').toBeTruthy();
      obj = {};
      expect(typeof t(obj).safeFunction === 'function').toBeTruthy();
      obj = undefined;
      expect(typeof t(obj).safeFunction === 'function').toBeTruthy();
      obj = [];
      expect(typeof t(obj).safeFunction === 'function').toBeTruthy();
      expect(typeof t(obj).safeFunction === 'function').toBeTruthy();
    });
  });

  describe('Safe Array', () => {
    const deepObj = {
      nestedKey: [
        {
          goodKey: ['hello'],
          numberKey: 10,
          objKey: {
            data: 'irrelevant',
          },
          funcKey: () => {}
        }
      ],
      nullKey: null,
    };

    test('should return the nested array in path', () => {
      expect(t(deepObj.nestedKey).safeArray).toEqual(deepObj.nestedKey);
      expect(t(deepObj, 'nestedKey').safeArray).toEqual(deepObj.nestedKey);
      expect(t(deepObj.nestedKey[0].goodKey).safeArray).toEqual(deepObj.nestedKey[0].goodKey);
      expect(t(deepObj, 'nestedKey[0].goodKey').safeArray).toEqual(deepObj.nestedKey[0].goodKey);
    });

    test('should return an array with a single value if path not an array', () => {
      expect(t(deepObj.nestedKey[0].numberKey).isNumber);
      expect(t(deepObj.nestedKey[0].numberKey).safeArray).toEqual([deepObj.nestedKey[0].numberKey]);
      expect(t(deepObj, 'nestedKey[0].numberKey').safeArray).toEqual([deepObj.nestedKey[0].numberKey]);

      expect(t(deepObj.nestedKey[0].objKey).isObject);
      expect(t(deepObj.nestedKey[0].objKey).safeArray).toEqual([deepObj.nestedKey[0].objKey]);
      expect(t(deepObj, 'nestedKey[0].objKey').safeArray).toEqual([deepObj.nestedKey[0].objKey]);

      expect(t(deepObj.nestedKey[0].funcKey).isFunction);
      expect(t(deepObj.nestedKey[0].funcKey).safeArray).toEqual([deepObj.nestedKey[0].funcKey]);
      expect(t(deepObj, 'nestedKey[0].funcKey').safeArray).toEqual([deepObj.nestedKey[0].funcKey]);
    });

    test('should not throw if path not found', () => {
      expect(t(deepObj, 'nestedKey[0].undefinedKey').safeArray).toEqual([]);
      expect(t(deepObj, 'nestedKey[1]').safeArray).toEqual([]);

      expect(t(deepObj, 'nullKey').isNull).toEqual(true);
      expect(t(deepObj, 'nullKey').safeArray).toEqual([]);
    });
  });

  describe('New Instance', () => {
    test('should return new instance for each input', () => {
      const stringType = t('hello');
      expect(stringType.isString === true).toBeTruthy();
      const numberType = t(123);
      expect(numberType.isNumber === true).toBeTruthy();
      expect(stringType.isString === true).toBeTruthy();
      const dateType = t(new Date());
      expect(dateType.isDate === true).toBeTruthy();
    });
  });

  describe('Monkey Test', () => {
    test('should not throw error for any input', () => {
      const mockObj = { goodKey: 'hello' };
      const monkeyInputs = [
        1, 0, -1, '', 'hey', true, false, {}, { yo: 'yoyo' },
        [], [1, 2], null, undefined, mockObj.goodKey, mockObj.badKey,
        NaN, () => {}, Error, new Error(), Object,
      ];
      monkeyInputs.map((input) => {
        expect(() => t(input)).not.toThrow();
        return input;
      });
    });
  });

  describe('Check Object Schema', () => {
    const batmanObject = {
      name: 'Batman',
      data: [
        {
          kills: 1001,
          build: [
            {
              species: 'Human',
              weight: 100
            }
          ]
        }
      ],
      lastSeen: new Date()
    };

    const superheroSchema = {
      name: Schema.String,
      data: [
        {
          kills: Schema.Number,
          build: [
            {
              species: Schema.String,
              weight: Schema.Number
            }
          ]
        }
      ],
      lastSeen: Schema.Date
    };

    test('should return true if object and schema are a valid match', () => {
      expect(t(batmanObject, superheroSchema).input).toEqual(batmanObject);
      expect(t(batmanObject, superheroSchema).schemaCheck).toEqual(true);
      expect(t(batmanObject, superheroSchema).isValid).toEqual(true);
    });

    test('should not throw if object and schema are not a valid match', () => {
      const weirdSuperheroSchema = {
        name: Schema.Number,
        data: [
          {
            kills: Schema.Number,
            build: [
              {
                species: Schema.String,
                weight: Schema.Number
              }
            ]
          }
        ]
      };

      expect(t(batmanObject, weirdSuperheroSchema).schemaCheck).toEqual(false);
      expect(t(batmanObject, weirdSuperheroSchema).isValid).toEqual(false);
    });
  });

  test('Monkey Test - Schema Validation', () => {
    let expectedSchema = {
      name: Schema.String,
      arr: Schema.Array
    };

    let obj = {
      name: 'Jack',
      arr: [1, 2, 3]
    };
    expect(t(obj, expectedSchema).isValid).toEqual(true);

    obj = {
      name: 'Jack',
      arr: ['1', 2, 3]
    };
    expect(t(obj, expectedSchema).isValid).toEqual(true);

    obj = {
      name: 'Jack',
      arr: [{
        key: 'val'
      }]
    };
    expect(t(obj, expectedSchema).isValid).toEqual(true);

    obj = {
      name: 22,
      arr: ['1', 2, 3]
    };
    expect(t(obj, expectedSchema).isValid).toEqual(false);

    expectedSchema = {
      name: Schema.String,
      arr: [{
        key: Schema.String
      }]
    };
    obj = {
      name: 'Jack',
      arr: [{
        key: 'val'
      }]
    };
    expect(t(obj, expectedSchema).isValid).toEqual(true);

    obj = {
      name: 'Jack',
      arr: [1, 2, 4]
    };
    expect(t(obj, expectedSchema).isValid).toEqual(false);
  });

  describe('Custom Type Check', () => {
    test('should validate custom type checks', () => {
      addCustomTypes({
        isPhone: input => (t(input).isNumber && /^\d{10}$/g.test(String(input))),
        isAddress: input => (t(input).isString && input.toUpperCase().includes('DOWNING STREET'))
      });
      expect(t(9892389239).isPhone === true).toBeTruthy();
      expect(t(98923892390).isPhone === false).toBeTruthy();
      expect(t('10 Downing Street haha').isAddress === true).toBeTruthy();
      expect(t('10 Street haha').isAddress === false).toBeTruthy();
    });
  });
});

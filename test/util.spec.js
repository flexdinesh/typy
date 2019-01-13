import { getNestedObject, convertSchemaAndGetMatch, buildSchema, getSchemaMatch } from '../src/util';
import { Schema } from '../src/index';

describe('Nested Object/Keys Check', () => {
  test('should return nested object if exists', () => {
    const mockObj = { goodKey: 'hello' };
    expect(getNestedObject(mockObj, 'goodKey') !== undefined).toBeTruthy();
    const mockDeepObj = {
      nestedKey: {
        goodKey: 'hello'
      }
    };
    expect(getNestedObject(mockDeepObj, 'nestedKey.goodKey') === mockDeepObj.nestedKey.goodKey).toBeTruthy();
    expect(getNestedObject(mockDeepObj, 'nestedKey.goodKey') !== undefined).toBeTruthy();
  });

  test('should return undefined if nested object does not exist', () => {
    const mockObj = { goodKey: 'hello' };
    expect(getNestedObject(mockObj, 'goodKey.badkey') === undefined).toBeTruthy();
    const mockDeepObj = {
      nestedKey: {
        goodKey: 'hello'
      }
    };
    expect(getNestedObject(mockDeepObj, 'badKey.goodKey') === undefined).toBeTruthy();
    expect(getNestedObject(mockDeepObj, 'goodKey.badKey') === undefined).toBeTruthy();
    expect(getNestedObject(mockDeepObj, 'nestedKey.badKey') === undefined).toBeTruthy();
  });

  test('should return nested object when array element is in path', () => {
    let mockObj = {
      nestedArray: [
        { goodKey: 'hello one' },
        { goodKey: 'hello two' },
        { goodKey: 'hello three' },
        { goodKey: 'hello four' },
        { goodKey: 'hello five' },
        { goodKey: 'hello six' },
        { goodKey: 'hello seven' },
        { goodKey: 'hello eight' },
        { goodKey: 'hello nine' },
        { goodKey: 'hello ten' },
        { goodKey: 'hello eleven' },
      ]
    };
    expect(getNestedObject(mockObj, 'nestedArray[0].goodKey') === 'hello one').toBeTruthy();
    expect(getNestedObject(mockObj, 'nestedArray[1].goodKey') === 'hello two').toBeTruthy();
    expect(getNestedObject(mockObj, 'nestedArray[10].goodKey') === 'hello eleven').toBeTruthy();

    mockObj = {
      nestedArray: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
    };
    expect(getNestedObject(mockObj, 'nestedArray[0]') === 'a').toBeTruthy();
    expect(getNestedObject(mockObj, 'nestedArray[1]') === 'b').toBeTruthy();
    expect(getNestedObject(mockObj, 'nestedArray[10]') === 'k').toBeTruthy();
  });

  test(
    'should return deeply nested object when there are multiple array elements in path',
    () => {
      const mockObj = {
        '@id': 'weird',
        firstArray: [
          {
            '@id': 'identifier',
            goodKey: 'hello one',
            secondArray: [
              {
                '@id': 'unique',
                goodKey: 'deep hello'
              }
            ],
            stackedArray: [['a1', 'a2'], ['b1', 'b2', 'b3'], ['c']]
          }
        ]
      };

      expect(getNestedObject(mockObj, '["@id"]') === 'weird').toBeTruthy();
      expect(getNestedObject(mockObj, 'firstArray[0].goodKey') === 'hello one').toBeTruthy();
      expect(getNestedObject(mockObj, 'firstArray[0]["@id"]') === 'identifier').toBeTruthy();
      expect(getNestedObject(mockObj, 'firstArray[0].secondArray[0].goodKey') === 'deep hello').toBeTruthy();
      expect(getNestedObject(mockObj, 'firstArray[0].secondArray[0][@id]') === 'unique').toBeTruthy();
      expect(getNestedObject(mockObj, 'firstArray[0].stackedArray[0][1]') === 'a2').toBeTruthy();
    }
  );

  test(
    'should return undefined when array element in path does not exist',
    () => {
      const mockObj = {
        nestedArray: [
          { goodKey: 'hello one' },
          { goodKey: 'hello two' }
        ]
      };
      expect(getNestedObject(mockObj, 'badArray[0].goodKey') === undefined).toBeTruthy();
      expect(getNestedObject(mockObj, 'nestedArray[1].goodKey.badkey') === undefined).toBeTruthy();
      expect(getNestedObject(mockObj, 'nestedArray[2].goodKey') === undefined).toBeTruthy();
      expect(getNestedObject(mockObj, 'nestedArray.goodKey') === undefined).toBeTruthy();
    }
  );

  test('monkey test nested object', () => {
    const mockObj = { goodKey: 'hello' };
    expect(getNestedObject(mockObj, 'goodKey,badkey') === undefined).toBeTruthy();
    expect(getNestedObject(mockObj, null) === undefined).toBeTruthy();
    expect(getNestedObject(mockObj, 1) === undefined).toBeTruthy();
    expect(getNestedObject(mockObj, 0) === undefined).toBeTruthy();
    expect(getNestedObject(mockObj, {}) === undefined).toBeTruthy();
    expect(getNestedObject(undefined, 'goodKey,badkey') === undefined).toBeTruthy();
  });
});

describe('Objects and Schema check', () => {
  test('should return only typeOf for primitive types', () => {
    const objSchema = Schema.String;

    const mockSchemaObj = 'typy';

    expect(typeof buildSchema(objSchema) === typeof mockSchemaObj).toBeTruthy();
  });

  test('should convert complex schema to object', () => {
    const objSchema = {
      name: Schema.String,
      data: [
        {
          unitCount: Schema.Number,
          units: [
            {
              label: Schema.String,
              weight: Schema.Number,
            }
          ]
        }
      ]
    };

    const mockSchemaObj = {
      name: 'typy',
      data: [
        {
          unitCount: 1,
          units: [
            {
              label: 'typy',
              weight: 1,
            }
          ]
        }
      ]
    };

    const schema = buildSchema(objSchema);
    expect(schema.name === mockSchemaObj.name).toBeTruthy();
    expect(schema.data[0].unitCount === mockSchemaObj.data[0].unitCount).toBeTruthy();
    expect(schema.data[0].units[0].label === mockSchemaObj.data[0].units[0].label).toBeTruthy();
    expect(schema.data[0].units[0].weight === mockSchemaObj.data[0].units[0].weight).toBeTruthy();
  });

  test('should convert schema with function type to object with function', () => {
    const objSchema = {
      getName: Schema.Function,
      getRandomString: Schema.Function
    };

    const mockSchemaObj = {
      getName: () => {},
      getRandomString: function lol() { return true; } // eslint-disable-line object-shorthand
    };

    expect(typeof buildSchema(objSchema).getName === typeof mockSchemaObj.getName).toBeTruthy();
    expect(typeof buildSchema(objSchema).getRandomString === typeof mockSchemaObj.getRandomString).toBeTruthy(); // eslint-disable-line max-len
  });

  test('should return true when two objects match', () => {
    const objectOne = {
      Rank: 1,
      Name: 'Popoye'
    };

    const objectTwo = {
      Rank: 99,
      Name: 'Wolverine'
    };

    expect(getSchemaMatch(objectOne, objectTwo) === true).toBeTruthy();
  });

  test('should return true for complex objects when they match', () => {
    const objectZero = {
      name: 'Batman',
      data: [
        {
          unitCount: 'luck',
          units: [
            {
              label: 'Superhero',
              weight: 85,
            }
          ]
        }
      ]
    };

    const objectOne = {
      name: 'Batman',
      data: [
        {
          unitCount: 13,
          units: [
            {
              label: 'Superhero',
              weight: 85,
            }
          ]
        }
      ]
    };

    const objectTwo = {
      name: 'typy',
      data: [
        {
          unitCount: 1,
          units: [
            {
              label: 'typy',
              weight: 1,
            }
          ]
        }
      ]
    };

    expect(getSchemaMatch(objectZero, objectTwo) === false).toBeTruthy();
    expect(getSchemaMatch(objectOne, objectTwo) === true).toBeTruthy();
  });

  test(
    'should convert schema to object and return true for schema match',
    () => {
      const obj = {
        name: '1',
        data: [
          {
            unitCount: 10,
            units: [
              {
                label: 'lobel',
                weight: 10
              }
            ]
          }
        ]
      };

      const objSchema = {
        name: Schema.String,
        data: [
          {
            unitCount: Schema.Number,
            units: [
              {
                label: Schema.String,
                weight: Schema.Number,
              }
            ]
          }
        ]
      };

      const weirdObjSchema = {
        name: Schema.Number,
        data: [
          {
            unitCount: Schema.Number,
            units: [
              {
                label: Schema.String,
                weight: Schema.Number,
              }
            ]
          }
        ]
      };

      expect(convertSchemaAndGetMatch(obj, objSchema) !== -1).toBeTruthy();
      expect(typeof convertSchemaAndGetMatch(obj, objSchema) === 'object').toBeTruthy();
      expect(convertSchemaAndGetMatch(obj, weirdObjSchema) === -1).toBeTruthy();
    }
  );
});

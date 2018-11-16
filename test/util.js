import { assert } from 'chai';
import { getNestedObject, convertSchemaAndGetMatch, buildSchema, getSchemaMatch } from '../src/util';
import Typy from '../src/typy';

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
    assert(getNestedObject(mockObj, 'nestedArray[0].goodKey') === 'hello one');
    assert(getNestedObject(mockObj, 'nestedArray[1].goodKey') === 'hello two');
    assert(getNestedObject(mockObj, 'nestedArray[10].goodKey') === 'hello eleven');

    mockObj = {
      nestedArray: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
    };
    assert(getNestedObject(mockObj, 'nestedArray[0]') === 'a');
    assert(getNestedObject(mockObj, 'nestedArray[1]') === 'b');
    assert(getNestedObject(mockObj, 'nestedArray[10]') === 'k');
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
    assert(getNestedObject(undefined, 'goodKey,badkey') === undefined);
  });
});

describe('Objects and Schema check', () => {
  it('should return only typeOf for primitive types', () => {
    const objSchema = new Typy().String;

    const mockSchemaObj = 'typy';

    assert(typeof buildSchema(objSchema) === typeof mockSchemaObj);
  });

  it('should convert complex schema to object', () => {
    const objSchema = {
      name: new Typy().String,
      data: [
        {
          unitCount: new Typy().Number,
          units: [
            {
              label: new Typy().String,
              weight: new Typy().Number,
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
    assert(schema.name === mockSchemaObj.name);
    assert(schema.data[0].unitCount === mockSchemaObj.data[0].unitCount);
    assert(schema.data[0].units[0].label === mockSchemaObj.data[0].units[0].label);
    assert(schema.data[0].units[0].weight === mockSchemaObj.data[0].units[0].weight);
  });

  it('should convert schema with function type to object with function', () => {
    const objSchema = {
      getName: new Typy().Function,
      getRandomString: new Typy().Function
    };

    const mockSchemaObj = {
      getName: () => {},
      getRandomString: function lol() { return true; } // eslint-disable-line object-shorthand
    };

    assert(typeof buildSchema(objSchema).getName === typeof mockSchemaObj.getName);
    assert(typeof buildSchema(objSchema).getRandomString === typeof mockSchemaObj.getRandomString);
  });

  it('should return true when two objects match', () => {
    const objectOne = {
      Rank: 1,
      Name: 'Popoye'
    };

    const objectTwo = {
      Rank: 99,
      Name: 'Wolverine'
    };

    assert(getSchemaMatch(objectOne, objectTwo) === true);
  });

  it('should return true for complex objects when they match', () => {
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

    assert(getSchemaMatch(objectZero, objectTwo) === false);
    assert(getSchemaMatch(objectOne, objectTwo) === true);
  });

  it('should convert schema to object and return true for schema match', () => {
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
      name: new Typy().String,
      data: [
        {
          unitCount: new Typy().Number,
          units: [
            {
              label: new Typy().String,
              weight: new Typy().Number,
            }
          ]
        }
      ]
    };

    const weirdObjSchema = {
      name: new Typy().Number,
      data: [
        {
          unitCount: new Typy().Number,
          units: [
            {
              label: new Typy().String,
              weight: new Typy().Number,
            }
          ]
        }
      ]
    };

    assert(convertSchemaAndGetMatch(obj, objSchema) !== -1);
    assert(typeof convertSchemaAndGetMatch(obj, objSchema) === 'object');
    assert(convertSchemaAndGetMatch(obj, weirdObjSchema) === -1);
  });
});

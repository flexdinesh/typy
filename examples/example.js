/* eslint-disable no-console */
const { t, Schema, addCustomTypes } = require('../lib');

// Undefined Checks
const exampleObj = {
  goodKey: 'I exist :)',
  nestedKey: {
    nestedGoodKey: 'Me too!'
  },
  symbolKey: Symbol(123)
};

console.log(`exampleObj is defined - ${t(exampleObj).isDefined}`); // true
console.log(`exampleObj.goodKey is defined - ${t(exampleObj, 'goodKey').isDefined}`); // true
console.log(`exampleObj.badKey is defined - ${t(exampleObj, 'badKey').isDefined}`); // false
console.log(`exampleObj.badKey is undefined - ${t(exampleObj, 'badKey').isUndefined}`); // false
console.log(`exampleObj.nestedKey.nestedGoodKey is defined - ${t(exampleObj, 'nestedKey.nestedGoodKey').isDefined}`); // true
console.log(`exampleObj.badKey.nestedGoodKey is defined - ${t(exampleObj, 'badKey.nestedGoodKey').isDefined}`); // false
console.log(`exampleObj.badKey.nestedGoodKey is undefined - ${t(exampleObj, 'badKey.nestedGoodKey').isUndefined}`); // true

// Type Checks
const nullObj = null;
console.log(`nullObj is null - ${t(nullObj).isNull}`); // true

const str = 'hello';
console.log(`str is String - ${t(str).isString}`); // true

const num = 22;
console.log(`num is Number - ${t(num).isNumber}`); // true

let bool = true;
console.log(`bool is Boolean - ${t(bool).isBoolean}`); // true
bool = true;
console.log(`bool is true - ${t(bool).isTrue}`); // true
bool = false;
console.log(`bool is false - ${t(bool).isFalse}`); // true

const obj = {};
console.log(`obj is an Object - ${t(obj).isObject}`); // true
console.log(`obj is an empty Object - ${t(obj).isEmptyObject}`); // true

const arr = [];
console.log(`arr is an Array - ${t(arr).isArray}`); // true
console.log(`arr is an empty Array - ${t(arr).isEmptyArray}`); // true

const date = new Date();
console.log(`type of 'date' is Date - ${t(date).isDate}`); // true
console.log(`type of 'obj' is not date - ${t(obj).isDate}`); // false
console.log(`type of 'arr' is not date - ${t(arr).isDate}`); // false

const exampleDateObj = {
  key: {
    nestedGoodDate: 'new Date()'
  }
};
console.log(`exampleDateObj.key.nestedGoodDate is defined - ${t(exampleDateObj, 'key.nestedGoodDate').isDefined}`); // true
console.log(`exampleDateObj.key.nestedGoodDate is of type Date - ${t(exampleDateObj, 'key.nestedGoodDate').isDate}`); // true

const mySymbol = Symbol('symbol-description');
console.log(`is 'mySymbol' a Symbol - ${t(mySymbol).isSymbol}`);
console.log(`is 'obj' a Symbol? - ${t(obj).isSymbol}`);
console.log(`is 'arr' a Symbol? - ${t(arr).isSymbol}`);

// Schema Checks
const validSchema = {
  goodKey: Schema.String,
  nestedKey: {
    nestedGoodKey: Schema.String
  },
  symbolKey: Schema.Symbol
};
console.log(`exampleObj matches validSchema - ${t(exampleObj, validSchema).isValid}`); // true

const inValidSchema = {
  goodKey: Schema.String,
  nestedKey: Schema.Array
};
console.log(`exampleObj does not match inValidSchema - ${t(exampleObj, inValidSchema).isValid}`); // false

// Custom Types
addCustomTypes({
  isPhone: input => (t(input).isNumber && /^\d{10}$/g.test(String(input))), // has 10 digits
  isAddress: input => (t(input).isString && input.toUpperCase().includes('STREET')) // includes 'street' in address
});

const validPhoneNum = 9892389239;
const invalidPhoneNum = 98923892390;
console.log(`9892389239 is a valid phone num - ${t(validPhoneNum).isPhone}`); // true
console.log(`98923892390 is a valid phone num - ${t(invalidPhoneNum).isPhone}`); // false

const validAddress = '10 Downing Street';
const invalidAddress = 'bwahahaha';
console.log(`"10 Downing Street" is a valid address - ${t(validAddress).isAddress}`); // true
console.log(`"bwahahaha" is a valid address - ${t(invalidAddress).isAddress}`); // false

const string = 'someString';
const stringObject = new String('MyString'); // eslint-disable-line no-new-wrappers
console.log(`String literal test: ${t(string).isString}`);
console.log(`String object test: ${t(stringObject).isString}`);

const booleanLiteral = false;
const booleanObject = new Boolean(123); // eslint-disable-line no-new-wrappers
console.log(`Boolean literal test: ${t(booleanLiteral).isBoolean}`);
console.log(`Boolean object test: ${t(booleanObject).isBoolean}`);

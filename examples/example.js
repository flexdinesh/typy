/* eslint-disable no-console */
const t = require('../lib');

const exampleObj = {
  goodKey: 'I exist :)',
  nestedKey: {
    nestedGoodKey: 'Me too!'
  }
};

console.log(`exampleObj is defined - ${t(exampleObj).isDefined}`); // true
console.log(`exampleObj.goodKey is defined - ${t(exampleObj, 'goodKey').isDefined}`); // true
console.log(`exampleObj.badKey is defined - ${t(exampleObj, 'badKey').isDefined}`); // false
console.log(`exampleObj.badKey is undefined - ${t(exampleObj, 'badKey').isUndefined}`); // false
console.log(`exampleObj.nestedKey.nestedGoodKey is defined - ${t(exampleObj, 'nestedKey.nestedGoodKey').isDefined}`); // true
console.log(`exampleObj.nestedKey.nestedGoodKey is undefined - ${t(exampleObj, 'badKey.nestedGoodKey').isDefined}`); // false
console.log(`exampleObj.nestedKey.nestedGoodKey is undefined - ${t(exampleObj, 'badKey.nestedGoodKey').isUndefined}`); // true

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

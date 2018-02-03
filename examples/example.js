/* eslint-disable no-console */
const t = require('../lib');

const exampleObj = {
  goodKey: 'I exist :)'
};

console.log(`exampleObj is definied - ${t(exampleObj).isDefined}`); // true
console.log(`exampleObj.goodKey is definied - ${t(exampleObj, 'goodKey').isDefined}`); // true
console.log(`exampleObj.badKey is definied - ${t(exampleObj, 'badKey').isDefined}`); // false
console.log(`exampleObj.badKey is undefinied - ${t(exampleObj, 'badKey').isUndefined}`); // false

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

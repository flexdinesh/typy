/* eslint-disable no-console */
const is = require('../lib');

const exampleObj = {
  goodKey: 'I exist :)'
};

if (is(exampleObj.goodKey).isDefined) { // true
  console.log('Yaay, goodKey exists in exampleObj');
}
// in the console - 'Yaay, goodKey exists in exampleObj'

if (is(exampleObj.badKey).isDefined) { // false
  console.log('Yaay, badKey exists in exampleObj');
} else {
  console.log('Sad, badKey doesn\'t exist in exampleObj');
}
// in the console - 'Sad, badKey doesn't exist in exampleObj'

const nullObj = null;
if (is(nullObj).isNull) { // true
  console.log('Yo, nullObj is null');
}
// in the console - 'Yo, nullObj is null'

import Typy from './typy';

const t = (input, objectPath) => new Typy().t(input, objectPath);
const { Number } = new Typy().Number;
const { String } = new Typy().String;
const { Boolean } = new Typy().Boolean;
const { Function } = new Typy().Function;
const { Null } = new Typy().Null;
const { Undefined } = new Typy().Undefined;

module.exports = {
  t,
  Number,
  String,
  Boolean,
  Function,
  Null,
  Undefined
};

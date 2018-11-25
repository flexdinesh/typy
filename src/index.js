import Typy from './typy';
import { setCustomTypes } from './util';

const commonTypy = new Typy();
const t = (input, objectPath) => commonTypy.t(input, objectPath);
const setCustom = validator => setCustomTypes(commonTypy, validator);
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
  Undefined,
  setCustomTypes: setCustom
};

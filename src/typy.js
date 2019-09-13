import { getNestedObject, convertSchemaAndGetMatch } from './util';

class Typy {
  static Schema = {
    Number: 1,
    String: 'typy',
    Boolean: true,
    Null: null,
    Undefined: undefined,
    Array: [],
    /* istanbul ignore next */
    Function: () => {},
    Date: new Date(),
    Symbol: Symbol('')
  };

  t = (obj, options) => {
    this.input = obj;
    this.schemaCheck = null;

    if (options) {
      if (typeof options === 'string') {
        this.input = getNestedObject(this.input, options);
      } else {
        const checkSchema = convertSchemaAndGetMatch(this.input, options);
        if (checkSchema !== -1) {
          this.schemaCheck = true;
          this.input = checkSchema;
        } else {
          this.schemaCheck = false;
          this.input = obj;
        }
      }
    }

    return this;
  };

  get isValid() {
    if (
      this.schemaCheck !== null &&
      this.schemaCheck === true &&
      this.input !== null &&
      this.input !== undefined
    ) {
      return true;
    }
    return false;
  }

  get isDefined() {
    if (typeof this.input !== 'undefined') return true;
    return false;
  }

  get isUndefined() {
    if (typeof this.input === 'undefined') return true;
    return false;
  }

  get isNull() {
    if (this.input === null && typeof this.input === 'object') return true;
    return false;
  }

  get isNullOrUndefined() {
    if (this.isNull || this.isUndefined) return true;
    return false;
  }

  get isBoolean() {
    if (typeof this.input === typeof true) return true;
    return false;
  }

  get isTrue() {
    if (this.input === true) return true;
    return false;
  }

  get isFalse() {
    if (this.input === false) return true;
    return false;
  }

  get isTruthy() {
    if (this.input) return true;
    return false;
  }

  get isFalsy() {
    if (!this.input) return true;
    return false;
  }

  get isObject() {
    if (
      typeof this.input === 'object' &&
      this.input === Object(this.input) &&
      Object.prototype.toString.call(this.input) !== '[object Array]' &&
      Object.prototype.toString.call(this.input) !== '[object Date]'
    ) {
      return true;
    }
    return false;
  }

  get isEmptyObject() {
    if (this.isObject && Object.keys(this.input).length === 0) return true;
    return false;
  }

  get isString() {
    if (typeof this.input === 'string') return true;
    return false;
  }

  get isEmptyString() {
    if (this.isString && this.input.length === 0) return true;
    return false;
  }

  get isNumber() {
    if (Number.isFinite(this.input)) return true;
    return false;
  }

  get isArray() {
    if (Array.isArray(this.input)) return true;
    return false;
  }

  get isEmptyArray() {
    if (this.isArray && this.input.length === 0) return true;
    return false;
  }

  get isFunction() {
    if (typeof this.input === 'function') return true;
    return false;
  }

  get isDate() {
    return (
      this.input instanceof Date ||
      Object.prototype.toString.call(this.input) === '[object Date]'
    );
  }

  get isSymbol() {
    return (
      typeof this.input === 'symbol' ||
      (typeof this.input === 'object' &&
        Object.prototype.toString.call(this.input) === '[object Symbol]')
    );
  }

  get safeObject() {
    return this.input;
  }

  get safeObjectOrEmpty() {
    if (this.input) return this.input;
    return {};
  }

  get safeString() {
    if (this.isString) return this.input;
    return '';
  }

  get safeNumber() {
    if (this.isNumber) return this.input;
    return 0;
  }

  get safeBoolean() {
    if (this.isBoolean) return this.input;
    return false;
  }

  get safeFunction() {
    if (this.isFunction) return this.input;
    return /* istanbul ignore next */ () => {};
  }

  get safeArray() {
    if (this.isArray) return this.input;
    if (!this.isNullOrUndefined) return [this.input];
    return [];
  }
}

export default Typy;

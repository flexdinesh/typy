
class Typy {
  constructor() {
    this.resetVal();
  }

  resetVal() {
    this.isUndefined = false;
    this.isDefined = false;
    this.isNull = false;
    this.isNullOrUndefined = false;
    this.isBoolean = false;
    this.isTrue = false;
    this.isFalse = false;
    this.isTruthy = false;
    this.isFalsy = false;
    this.isObject = false;
    this.isEmptyObject = false;
    this.isString = false;
    this.isEmptyString = false;
    this.isNumber = false;
    this.isArray = false;
    this.isEmptyArray = false;
    this.isFunction = false;
  }

  evalUndefined = (obj) => {
    try {
      if (typeof obj !== 'undefined') {
        this.isDefined = true;
        this.isUndefined = false;
      } else {
        this.isDefined = false;
        this.isUndefined = true;
        this.isFalsy = true;
        this.isNullOrUndefined = true;
      }
    } catch (e) {
      this.isUndefined = true;
      this.isDefined = false;
      this.isFalsy = true;
      this.isNullOrUndefined = true;
    }
  }

  evalNull = (obj) => {
    if (obj === null && typeof obj === 'object') {
      this.isNull = true;
      this.isNullOrUndefined = true;
    } else {
      this.isNull = false;
    }
  }

  evalTruthyOrFalsy = (obj) => {
    if (obj) {
      this.isTruthy = true;
      this.isFalsy = false;
    }
    if (!obj) {
      this.isFalsy = true;
      this.isTruthy = false;
    }
  }

  evalType = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      this.isObject = true;
      if (Object.keys(obj).length === 0) this.isEmptyObject = true;
    }
    if (typeof obj === 'string') {
      this.isString = true;
      if (obj.length === 0) this.isEmptyString = true;
    }
    if (Number.isInteger(obj)) {
      this.isNumber = true;
    }
    if (typeof obj === typeof (true)) {
      this.isBoolean = true;
      if (obj === true) {
        this.isTrue = true;
        this.isFalse = false;
      }
      if (obj === false) {
        this.isFalse = true;
        this.isTrue = false;
      }
    }
    if (Array.isArray(obj)) {
      this.isArray = true;
      if (obj.length === 0) this.isEmptyArray = true;
    }

    if (typeof obj === 'function') {
      this.isFunction = true;
    }
  }

  t = (obj) => {
    this.resetVal();
    this.evalUndefined(obj);
    if (this.isDefined) {
      this.evalNull(obj);
      this.evalTruthyOrFalsy(obj);
      this.evalType(obj);
    }
    return this;
  }
}

const { t } = new Typy();
export default t;

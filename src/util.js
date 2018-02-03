export const getNestedObject = (obj, dotSeparatedKeys) => {
  // eslint-disable-next-line
  let objUndefined = true;
  let safeObj = obj;

  if (typeof obj !== 'undefined' && typeof dotSeparatedKeys === 'string') {
    objUndefined = false;
    const keys = dotSeparatedKeys.split('.');

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (typeof safeObj[key] !== 'undefined') {
        safeObj = safeObj[key];
      } else {
        objUndefined = true;
        break;
      }
    }
  }

  if (!objUndefined) return safeObj;
  return undefined;
};

export const printAllMatchedTypes = (obj) => {
  // eslint-disable-next-line
  console.log(`
    isUndefined: ${obj.isUndefined}
    isDefined: ${obj.isDefined}
    isNull: ${obj.isNull}
    isNullOrUndefined: ${obj.isNullOrUndefined}
    isBoolean: ${obj.isBoolean}
    isTrue: ${obj.isTrue}
    isFalse: ${obj.isFalse}
    isTruthy: ${obj.isTruthy}
    isFalsy: ${obj.isFalsy}
    isObject: ${obj.isObject}
    isEmptyObject: ${obj.isEmptyObject}
    isString: ${obj.isString}
    isEmptyString: ${obj.isEmptyString}
    isNumber: ${obj.isNumber}
    isArray: ${obj.isArray}
    isEmptyArray: ${obj.isEmptyArray}
    isFunction: ${obj.isFunction}
    `);
};

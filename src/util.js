export const stripKeyFromArrayPath = path => path.split('[').shift();

export const stripArrayIndexFromArrayPath = (path) => {
  const matches = /\[([^)]+)\]/.exec(path);
  if (Array.isArray(matches) && matches.length >= 1) return Number(matches[1]);
  return path;
};

export const getNestedObject = (obj, dotSeparatedKeys) => {
  if (arguments.length > 1 && typeof dotSeparatedKeys !== 'string') return undefined;
  if (typeof obj !== 'undefined' && typeof dotSeparatedKeys === 'string') {
    const pathArr = dotSeparatedKeys.split('.');
    pathArr.forEach((key, idx, arr) => {
      if (typeof key === 'string' && key.includes('[')) {
        try {
          arr.splice((idx + 1), 0, Number(/\[([^)]+)\]/.exec(key)[1]));
          arr[idx] = key.slice(0, -3); // eslint-disable-line no-param-reassign
        } catch (e) {
          // do nothing
        }
      }
    });
    // eslint-disable-next-line no-param-reassign, no-confusing-arrow
    obj = pathArr.reduce((o, key) => (o && o[key] !== 'undefined') ? o[key] : undefined, obj);
  }
  return obj;
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

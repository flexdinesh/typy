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

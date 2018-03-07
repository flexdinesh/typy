/* eslint-disable import/prefer-default-export */
export const getNestedObject = (obj, dotSeparatedKeys) => {
  if (arguments.length > 1 && typeof dotSeparatedKeys !== 'string') return undefined;
  if (typeof obj !== 'undefined' && typeof dotSeparatedKeys === 'string') {
    const pathArr = dotSeparatedKeys.split('.');
    pathArr.forEach((key, idx, arr) => {
      if (typeof key === 'string' && key.includes('[')) {
        try {
          // extract the array index as string
          const pos = /\[([^)]+)\]/.exec(key)[1];
          // get the index string length (i.e. '21'.length === 2)
          const posLen = pos.length;
          arr.splice(idx + 1, 0, Number(pos));

          // keep the key (array name) without the index comprehension:
          // (i.e. key without [] (string of length 2)
          // and the length of the index (posLen))
          arr[idx] = key.slice(0, (-2 - posLen)); // eslint-disable-line no-param-reassign
        } catch (e) {
          // do nothing
        }
      }
    });
    // eslint-disable-next-line no-param-reassign, no-confusing-arrow
    obj = pathArr.reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : undefined), obj);
  }
  return obj;
};

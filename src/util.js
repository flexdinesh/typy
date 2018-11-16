const getNestedObject = (obj, dotSeparatedKeys) => {
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

// istanbul ignores are used in 2 places which involve typeOf - Open issue at istanbul
// https://github.com/gotwarlost/istanbul/issues/582

const buildSchema = (schemaObject) => {
  if (Object.prototype.toString.call(schemaObject) === '[object Array]') {
    schemaObject.forEach(subObj => buildSchema(subObj));
  } else if (Object.prototype.toString.call(schemaObject) === '[object Object]') {
    Object.keys(schemaObject).forEach(subObj => buildSchema(schemaObject[subObj]));
  } else { // istanbul ignore next
    return typeof schemaObject;
  }
  return schemaObject;
};

const getSchemaMatch = (obj, objFromSchema) => {
  let result = false;
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    for (let i = 0; i < obj.length; i += 1) {
      if (!getSchemaMatch(obj[i], objFromSchema[i])) {
        result = false;
        break;
      }
      result = true;
    }
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    for (const key in obj) { // eslint-disable-line guard-for-in, no-restricted-syntax
      if (!getSchemaMatch(obj[key], objFromSchema[key])) {
        result = false;
        break;
      }
      result = true;
    }
  } else {
    // istanbul ignore next
    return typeof objFromSchema === typeof obj;
  }
  return result;
};

const convertSchemaAndGetMatch = (obj, schemaObject) => {
  const objectFromSchema = buildSchema(schemaObject);
  if (getSchemaMatch(obj, objectFromSchema)) { return obj; }
  return -1;
};

module.exports = {
  getNestedObject,
  buildSchema,
  getSchemaMatch,
  convertSchemaAndGetMatch
};

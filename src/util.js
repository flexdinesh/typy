const getNestedObject = (obj, dotSeparatedKeys) => {
  if (dotSeparatedKeys !== undefined && typeof dotSeparatedKeys !== 'string') return undefined;
  if (typeof obj !== 'undefined' && typeof dotSeparatedKeys === 'string') {
    // split on ".", "[", "]", "'", """ and filter out empty elements
    const splitRegex = /[.\[\]'"]/g; // eslint-disable-line no-useless-escape
    const pathArr = dotSeparatedKeys.split(splitRegex).filter(k => k !== '');

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
  } else {
    // istanbul ignore next
    return typeof schemaObject;
  }
  return schemaObject;
};

const getSchemaMatch = (obj, objFromSchema) => {
  let result = false;
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    if (objFromSchema.length) {
      for (let i = 0; i < obj.length; i += 1) {
        if (!getSchemaMatch(obj[i], objFromSchema[i])) {
          result = false;
          break;
        }
        result = true;
      }
    } else {
      return true;
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

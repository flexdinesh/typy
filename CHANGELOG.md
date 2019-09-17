# Changelog

## To Be Released

### version (undecided)

* what's next

## Released

### 3.3.0 (17 Sep 2019)

* NEW: `t(dateObj).isDate` - is available.
* NEW: `t(Symbol('desc')).isSymbol` - is available
* FIX: `getNestedObject` breaks in ESM modules

### 3.2.2 (6 Sep 2019)

* TypeScript `index.d.ts` type changes

### 3.2.1 (29 Aug 2019)

* FIX: Whitelist TypeScript `index.d.ts` file for npm

### 3.2.0 (29 Aug 2019)

* NEW: TypeScript type definitions

### 3.0.1 (19 Jan 2019)

* Added support for bracket syntax while accessing nested objects

`t('someObject.firstArray[0].secondArray[0].complexObject["@id"]').isDefined` is now possible.

### 3.0.0 (9 Dec 2018)

* Schema Validation
  * **Typy** can validate if an object matches a specific type schema
* Custom Types
  * Custom type validators can be added to **Typy**

This version introduces **BREAKING** changes (for node.js imports only). Make sure you update your code accordingly.

Before v3.0.0, `t` function was imported as

```js
const t = require('typy');
```

From v3.0.0, `t` function should be imported as

```js
const { t } = require('typy');
```

_Note: Breaking changes apply only for node.js CommonJS style require statements. This version affect ES6 style imports._

### 2.0.1 (7 Mar 2018)

* Fix: Nested arrays with length > 10 will work like a charm now

### 2.0.0 (4 Mar 2018)

* Package minified with >60% compression
* New getters added
  * `safeNumber` returns the value if input is Number or returns 0
  * `safeBoolean` returns the value if input is Boolean or returns false
  * `safeFunction` returns the function if input is function or returns an empty function () => {}

### 1.4.3 (6 Feb 2018)

* Added support for use in TypeScript codebases

### 1.4.0 (6 Feb 2018)

* Two new getters are available in Typy
  * `safeObject` returns the value from a nested object path without throwing
  * `safeString` returns the value if input is string or returns empty string

### 1.3.0 (5 Feb 2018)

* Performance optimizations

### 1.2.0 (5 Feb 2018)

* Typy can now store results to a variable and check the type later

### 1.1.0 (4 Feb 2018)

* Fixed a bug for Number type validation

### 1.0.0 (4 Feb 2018)

* Typy is released to the world =)
* Following APIs are included in the first release
 * `isDefined` returns if the input is defined
 * `isUndefined` returns if the input is undefined
 * `isNull` returns if the input is null
 * `isNullOrUndefined` returns if the input is either null or undefined
 * `isBoolean` returns if the input is a boolean
 * `isTrue` returns if the input is boolean true
 * `isFalse` returns if the input is boolean false
 * `isTruthy` returns if the input is truthy
 * `isFalsy` returns if the input is falsy
 * `isFalsy` returns if the input is falsy
 * `isObject` returns if the input is an object - {}
 * `isEmptyObject` returns if the input is an empty object
 * `isString` returns if the input is a string
 * `isEmptyString` returns if the input is an empty string
 * `isNumber` returns if the input is a number
 * `isArray` returns if the input is an array
 * `isEmptyArray` returns if the input is an empty array
 * `isFunction` returns if the input is a function

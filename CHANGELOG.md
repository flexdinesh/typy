# Changelog

## To Be Released

## 3.0.0 (25 Nov 2018)

* Schema Validation

## Released

## 2.0.1 (7 Mar 2018)

* Fix: Nested arrays with length > 10 will work like a charm now

## 2.0.0 (4 Mar 2018)

* Package minified with >60% compression
* New getters added
  * `safeNumber` returns the value if input is Number or returns 0
  * `safeBoolean` returns the value if input is Boolean or returns false
  * `safeFunction` returns the function if input is function or returns an empty function () => {}

## 1.4.3 (6 Feb 2018)

* Added support for use in TypeScript codebases

## 1.4.0 (6 Feb 2018)

* Two new getters are available in Typy
  * `safeObject` returns the value from a nested object path without throwing
  * `safeString` returns the value if input is string or returns empty string

## 1.3.0 (5 Feb 2018)

* Performance optimizations

## 1.2.0 (5 Feb 2018)

* Typy can now store results to a variable and check the type later

## 1.1.0 (4 Feb 2018)

* Fixed a bug for Number type validation

## 1.0.0 (4 Feb 2018)

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

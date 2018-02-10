# Typy

[![Build Status](https://travis-ci.org/flexdinesh/typy.svg?branch=master)](https://travis-ci.org/flexdinesh/typy)
[![dependencies Status](https://david-dm.org/flexdinesh/typy/status.svg)](https://david-dm.org/flexdinesh/typy)
[![npm version](https://badge.fury.io/js/typy.svg)](https://www.npmjs.com/package/typy)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Gitter](https://badges.gitter.im/flexdinesh/typy.svg)](https://gitter.im/flexdinesh/typy?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Type checking library for JavaScript with a _'sweeter'_ syntax.

`t('foo').isString // => true`


## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)

There are a hundred other type checking libraries out there. But **Typy** is built with three core behavioral aspects.

1. No surprises. **Typy** will never throw, no matter what the input is.
2. Object check will only look for **{ }** rather than JavaScript's native behavior of considering everything as objects such as arrays, functions, null, etc.
3. _Thought Driven Development_. Code should exactly mimic your thoughts on the logic rather than writing extra code just because that's how JavaScript works.
`t(obj).isDefined // => true`

## Install

```
$ npm install --save typy
```

## Usage

```js
import t from 'typy'; // ES6 style import
// var t = require('typy'); // ES5 style import

if (t('hello').isString) { // => true
  console.log('Input is a String!')
} else {
  console.log('Input is not a String!')
}

// More examples
t('22').isNumber // => false
t('22').isString // => true
t({}).isObject // => true
t([]).isArray // => true
t([]).isObject // => false

// obj.goodKey.nestedKey = 'helloworld'
// to check if obj.goodKey.nestedKey is defined
// but you don't know if obj.goodKey exists
t(obj, 'goodKey.nestedKey').isDefined // => true
t(obj, 'badKey.nestedKey').isDefined // => false
// Typy won't throw undefined error for badKey.nestedKey

// to check if obj.goodKey.nestedKey is a string
t(obj, 'goodKey.nestedKey').isString // => true
t(obj, 'badKey.nestedKey').isString // => false

const deepObj = {
  nestedKey: {
    goodKey: 'hello',
    superNestedKey: {}
  }
};
// Typy can safely return the value from a nested key in an object
const myObj = t(deepObj, 'nestedKey.goodKey').safeObject; // => 'hello'
// Typy won't throw undefined error for badKey.goodKey
// instead the return value will be undefined
const myObj = t(deepObj, 'badKey.goodKey').safeObject; // => undefined
```

## API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
  - [t(input, optionalObjectPath)](#tinput-optionalobjectpath)
  - [isDefined](#isdefined)
  - [isUndefined](#isundefined)
  - [isNull](#isnull)
  - [isNullOrUndefined](#isnullorundefined)
  - [isBoolean](#isboolean)
  - [isTrue](#istrue)
  - [isFalse](#isfalse)
  - [isTruthy](#istruthy)
  - [isFalsy](#isfalsy)
  - [isObject](#isobject)
  - [isEmptyObject](#isemptyobject)
  - [isString](#isstring)
  - [isEmptyString](#isemptystring)
  - [isNumber](#isnumber)
  - [isArray](#isarray)
  - [isEmptyArray](#isemptyarray)
  - [isFunction](#isfunction)
  - [safeObject](#safeobject)
  - [safeString](#safestring)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


#### t(input, optionalObjectPath)

Pass in your input to the t() method and **Typy** will take care of everything

```js
// you can pass any type of input
// Number, String, Object, null, undefined, Array, anything
t('str')
t(22)
t({foo: 'fooooo', bar: 'barooo'})
t([2, 'three', 'hey'])

const obj = {
  goodKey: {
    nestedKey: 'hello world'
  }
}
// To pass nested path of an object
// Ex. obj.goodKey.nestedKey
// You have to pass the path as string in the second param
t(obj, 'goodKey.nestedKey')
t(obj, 'badKey.nestedKey')
// this is because if you pass t(obj.badKey.nestedKey),
// you will get undefined exception
// because that is how javascript is designed
// to overcome that we need to pass the sub key as a string to Typy
```

#### isDefined

Returns _true_ if the input is defined.

```js
const obj = {
  goodKey: 'hello'
}

t(obj.goodKey).isDefined // => true
t(obj.badKey).isDefined // => false
```


#### isUndefined

Returns _true_ if the input is undefined.

```js
const obj = {
  goodKey: 'hello'
}

t(obj.goodKey).isUndefined // => false
t(obj.badKey).isUndefined // => true
```


#### isNull

Returns _true_ if the input is null.

```js
const obj = {
  foo: null
}

t(obj.foo).isNull // => true
```


#### isNullOrUndefined

Returns _true_ if the input is null or undefined.

```js
const obj = {
  foo: null
}

t(obj.foo).isNullOrUndefined // => true
t(obj.bar).isNullOrUndefined // => true
```


#### isBoolean

Returns _true_ if the input is either `true` or `false`.

```js
t(true).isBoolean // => true
t(false).isBoolean // => true
```


#### isTrue

Returns _true_ if the input is Boolean `true`.

```js
t(true).isTrue // => true
t(false).isTrue // => false
```


#### isFalse

Returns _true_ if the input is Boolean `false`.

```js
t(true).isFalse // => false
t(false).isFalse // => true
```


#### isTruthy

Returns _true_ if the input is considered _truthy_.

In JavaScript anything other than `false`, `0`, `''`, `""`, `null`, `undefined` and `NaN` is considered _truthy_.

```js
t('Typy is amazing =)').isTruthy // => true
t({}).isTruthy // => true
t(22).isTruthy // => true
t([1, 'two']).isTruthy // => true
```


#### isFalsy

Returns _true_ if the input is considered _falsy_.

In JavaScript any of these values `false`, `0`, `''`, `""`, `null`, `undefined` and `NaN` are considered _falsy_.

```js
t(0).isFalsy // => true
t(null).isFalsy // => true
t(undefined).isFalsy // => true
t(false).isFalsy // => true
```


#### isObject

Returns _true_ if the input is an object.

```js
const obj = {
  foo: null
}

t(obj).isObject // => true
t({}).isObject // => true
```

_Note: Only { } objects will return this as true as opposed to javascript definition of Object which includes Arrays, Functions, anything and everything related to prototype. This is an intentional behavior as we don't want arrays to return true for isObject._


#### isEmptyObject

Returns _true_ if the input is an empty object, _aka_ object without any keys.

```js
const obj = {
  foo: 'hello there',
  bar: {}
}

t(obj.bar).isEmptyObject // => true
t({}).isEmptyObject // => true
t(obj).isEmptyObject // => false
```


#### isString

Returns _true_ if the input is a string.

```js
const obj = {
  foo: 'typy is awesome =)',
}
t(obj.foo).isString // => true
t('').isString // => true
t(22).isString // => false
t(null).isString // => false
```


#### isEmptyString

Returns _true_ if the input is an empty string.

```js
t('').isEmptyString // => true
t('typy is so great').isEmptyString // => false
```


#### isNumber

Returns _true_ if the input is a number.

```js
t(22).isNumber // => true
t('i am a string').isNumber // => false
t({}).isNumber // => false
```


#### isArray

Returns _true_ if the input is an array.

```js
t([]).isArray // => true
t([1, 2, 'typy']).isArray // => true
t({}).isArray // => false
```


#### isEmptyArray

Returns _true_ if the input is an empty array.

```js
t([]).isEmptyArray // => true
t([1, 2, 'typy']).isEmptyArray // => false
```


#### isFunction

Returns _true_ if the input is a function.

```js
const func = () => {};
t(func).isFunction // => true
t({}).isFunction // => false
```


#### safeObject

Safely returns the value from a nested object path without throwing any error.

```js
const deepObj = {
  nestedKey: {
    goodKey: 'hello',
    superNestedKey: {}
  }
};
// Typy can safely return the value from a nested key in an object
const myObj = t(deepObj, 'nestedKey.goodKey').safeObject; // => 'hello'
// Typy won't throw if the key at any level is not found
// instead will return undefined
const myObj = t(deepObj, 'badKey.goodKey').safeObject; // => undefined

const anotherDeepObj = {
  nestedArray: [{
    goodKey: 'hello one',
    superNestedKey: {}
  }, {
    goodKey: 'hello two',
    superNestedKey: {
      superGoodKey: 'typy is great :)'
    }
  }]
};
// Typy can safely return the value even from a nested key in a nested array
const myObj = t(deepObj, 'nestedArray[1].superNestedKey.superGoodKey').safeObject; // => 'typy is great :)'
```


#### safeString

Returns the string value if the input type is string or will return an empty string `''`.

```js
const myObj = t('typy is safe').safeString; // => 'typy is safe'
const myObj = t(null).safeString; // => ''
const myObj = t(undefined).safeString; // => ''
const myObj = t(22).safeString; // => ''
```


## License

MIT © Dineshkumar Pandiyan

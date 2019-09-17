# Typy

[![Build Status](https://travis-ci.org/flexdinesh/typy.svg?branch=master)](https://travis-ci.org/flexdinesh/typy)
[![dependencies Status](https://david-dm.org/flexdinesh/typy/status.svg)](https://david-dm.org/flexdinesh/typy)
[![npm version](https://badge.fury.io/js/typy.svg)](https://www.npmjs.com/package/typy)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Gitter](https://badges.gitter.im/flexdinesh/typy.svg)](https://gitter.im/flexdinesh/typy?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Type checking library for JavaScript with a _'sweeter'_ syntax.

`t('foo').isString // => true`

## New in version 3 🔥

- [Schema Validation](#isvalid-schema-validation)
- [Custom Types](#addcustomtypes-custom-types)

Version **3.0.0** introduces **BREAKING** changes (for node.js CommonJS style imports only).

```js
// Before v3.0.0, `t` function was imported as
const t = require('typy');

//From v3.0.0, `t` function should be imported as
const { t } = require('typy');

// Note: This version does not affect previous ES6 style imports._
import t, { Schema, addCustomTypes } from 'typy'; // this will still work
import { t, Schema, addCustomTypes } from 'typy'; // this will also work
```

## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)

There are a hundred other type checking libraries out there. But **Typy** is built with three core behavioral aspects.

1. No surprises. **Typy** will never throw, no matter what the input is.
2. Object check will only look for **{ }** rather than JavaScript's native behavior of considering everything as objects such as arrays, functions, null, etc.
3. _Thought Driven Development_. Code should exactly mimic your thoughts on the logic rather than writing extra code just because that's how JavaScript works. `t(obj).isDefined // => true`
4. Custom type validation and schema validation.

## Install

```
$ npm install --save typy
```

## Usage

```js
import t from 'typy'; // ES6 style import
// var t = require('typy'); // CommonJS style import (version < 3)
// var t = require('typy').default; // CommonJS style import (version >= 3)

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

const sym = Symbol('typyIsAwesome');
t(sym).isSymbol // => true

// obj.goodKey.nestedKey = 'helloworld'
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
// safely return the value from a nested key in an object
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
  - [isDate](#isdate)
  - [isSymbol](#issymbol)
  - [safeObject](#safeobject)
  - [safeObjectOrEmpty](#safeobjectorempty)
  - [safeString](#safestring)
  - [safeNumber](#safenumber)
  - [safeBoolean](#safeboolean)
  - [safeFunction](#safefunction)
  - [safeArray](#safearray)
  - [isValid (Schema Validation)](#isvalid-schema-validation)
  - [addCustomTypes (Custom Types)](#addcustomtypes-custom-types)

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

#### isDate

Returns _true_ if the input is a javascript's date object.

```js
const date = new Date();
t(date).isDate // => true
t({}).isDate // => false
```

#### isSymbol

Returns _true_ if the input is a javascript's Symbol.

```js
const mySym = Symbol(123);
const anotherSymbol = Symbol('typyIsAwesome');

t(mySym).isSymbol // => true;
t(Object(anotherSymbol)).isSymbol  // => true;

t({}).isSymbol // => false
t([]).isSymbol // => false
t(null).isSymbol // => false
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
const myObj = t(anotherDeepObj, 'nestedArray[1].superNestedKey.superGoodKey').safeObject; // => 'typy is great :)'
```

#### safeObjectOrEmpty

Safely returns the value from a nested object path if the path exists
or returns an empty object if the.

```js
const deepObj = {
  nestedKey: {
    goodKey: 'hello',
    superNestedKey: {}
  }
};
// Typy can safely return the value from a nested key in an object
const myObj = t(deepObj, 'nestedKey.goodKey').safeObjectOrEmpty; // => 'hello'
// Typy won't throw if the key at any level is not found
// instead will return an empty object
const myObj = t(deepObj, 'badKey.goodKey').safeObjectOrEmpty; // => {}

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
const myObj = t(anotherDeepObj, 'nestedArray[1].superNestedKey.superGoodKey').safeObjectOrEmpty; // => 'typy is great :)'
```

#### safeString

Returns the string value if the input type is string or will return an empty string `''`.

```js
const str = t('typy is safe').safeString; // => 'typy is safe'
const str = t(null).safeString; // => ''
const str = t(undefined).safeString; // => ''
const str = t(22).safeString; // => ''
```

#### safeNumber

Returns the number if the input type is Number or will return `0`.

```js
const num = t(22).safeNumber; // => 22
const num = t('22').safeNumber; // => 0
const num = t(undefined).safeNumber; // => 0
const num = t(null).safeNumber; // => 0
```

#### safeBoolean

Returns the boolean if the input type is Boolean or will return `false`.

```js
const bool = t(true).safeBoolean; // => true
const bool = t(false).safeBoolean; // => false
const bool = t('22').safeBoolean; // => false
const bool = t(undefined).safeBoolean; // => false
const bool = t(22).safeBoolean; // => false
```

#### safeFunction

Returns the function if the input type is function or will return an empty function `() => {}`.

```js
const helloFunc = () => { return 'Hello World!' }
const func = t(helloFunc).safeFunction; // => helloFunc reference
const func = t('I am a string').safeFunction; // => empty function () => {}
const func = t(undefined).safeFunction; // => empty function () => {}
const func = t(null).safeFunction; // => empty function () => {}
```

#### safeArray

Safely returns the value from a nested object path or an empty array. If the path specified exists but is not an array, returns an array containing the value of the specified path.

```js
const deepObj = {
  nestedKey: [
    {
      goodKey: ['hello'],
      numberKey: 10,
      superNestedKey: {}
    },
  ]
};
// Typy can safely return the value from a nested key in an object or an array
const myObj = t(deepObj, 'nestedKey').safeArray; // => [ { goodKey: ['hello'], numberKey: 10, superNestedKey: {} } ]
const myObj = t(deepObj, 'nestedKey[0].goodKey').safeArray; // => ['hello']
// Typy can wrap a value or object inside an array
const myObj = t(deepObj, 'nestedKey[0].numberKey').safeArray; // => [ 10 ]
const myObj = t(deepObj, 'nestedKey[0].superNestedKey').safeArray; // => [ {} ]
// Typy won't throw if the key at any level is not found
// instead will return an empty array
const myObj = t(deepObj, 'nestedKey[1]').safeArray; // => []
const myObj = t(deepObj, 'badKey.goodKey').safeArray; // => []
```

#### isValid (Schema Validation)

`isValid` is used to check and validate the schema of an object. It returns `true` if the schema of the object matches the schema passed or `false` if the schema doesn't match.

```js
import t, { Schema } from 'typy';

const superheroSchema = {
  name: Schema.String,
  age: Schema.Number,
  appearances: [
    {
      title: Schema.String,
      alias: Schema.String,
    }
  ],
  lastSeen: Schema.Date
};
const batmanObject = {
  name: 'Batman',
  age: 45,
  isAlive: true,
  appearances: [
    {
      title: 'The Dark Knight',
      alias: 'Bruce',
    }
  ],
  lastSeen: new Date(14894561568)
};
const isSchemaValid = t(batmanObject, superheroSchema).isValid; // true

const simpleSchema = {
  name: Schema.String,
  arr: Schema.Array
};
const obj = {
  name: 'Jack',
  arr: [1, 2, 3]
};
const isSchemaValid = t(obj, simpleSchema).isValid; // true
```

The following **Schema types** are available in typy.

- Number
- String
- Array
- Boolean
- Null
- Undefined
- Function
- Date

#### addCustomTypes (Custom Types)

`addCustomTypes` is used to pass custom validators to **Typy**. It can be used to validate any ipnut for custom types, like this `t(input).isMyCustomType`.

You will have to add custom types only once in the project (preferabby in entry file. ex. `index.js`)

Entry file (Ex. `index.js`)

```js
import t, { addCustomTypes } from 'typy';

addCustomTypes({
  isPhone: (input) => (t(input).isNumber && /^\d{10}$/g.test(String(input))), // has 10 digits
  isAddress: (input) => (t(input).isString && input.toUpperCase().includes('STREET')) // includes 'street' in input
});

```

Anywhere in the project

```js
import t from 'typy';

const isThePhoneNumberValid = t(9892389239).isPhone; // => true
const isThePhoneNumberValid = t('abcdefg').isPhone; // => false

const isTheAddressValid = t('10 Downing Street').isAddress; // => true
const isTheAddressValid = t('I like cats 🐈').isAddress; // => false

```

## Contributors

Thanks goes to these amazing people 🎉

| [<img src="https://avatars3.githubusercontent.com/u/5777880?v=4" width="100px;"/><br /><sub><b>Dinesh Pandiyan</b></sub>](https://github.com/flexdinesh)<br /> | [<img src="https://avatars0.githubusercontent.com/u/6686039?v=4" width="100px;"/><br /><sub><b>Ozair Patel</b></sub>](https://github.com/OzairP)<br /> | [<img src="https://avatars0.githubusercontent.com/u/23170622?v=4" width="100px;"/><br /><sub><b>Aneerudh</b></sub>](https://github.com/Aneedroid)<br /> | [<img src="https://avatars1.githubusercontent.com/u/13482258?v=4" width="100px;"/><br /><sub><b>Ruphaa Ganesh</b></sub>](https://github.com/ruphaa)<br /> | [<img src="https://avatars0.githubusercontent.com/u/4320434?v=4" width="100px;"/><br /><sub><b>Quentin Jadeau</b></sub>](https://github.com/jadok)<br /> | [<img src="https://avatars3.githubusercontent.com/u/416559?s=400&v=4" width="100px;"/><br /><sub><b>dan</b></sub>](https://github.com/danthewolfe)<br />
| :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/13327?v=4" width="100px;"/><br /><sub><b>Robert Schadek</b></sub>](https://github.com/burner)<br /> | [<img src="https://avatars0.githubusercontent.com/u/43963628?v=4" width="100px;"/><br /><sub><b>Michael Kirkpatrick</b></sub>](https://github.com/mlkirkpatrick)<br /> | [<img src="https://avatars1.githubusercontent.com/u/13729562?v=4" width="100px;"/><br /><sub><b>Ana Liza Pandac</b></sub>](https://github.com/analizapandac)<br /> | [<img src="https://avatars1.githubusercontent.com/u/49582824?v=4" width="100px;"/><br /><sub><b>Abdul Rehman</b></sub>](https://github.com/rehman-00001)<br /> 

## License

MIT © Dinesh Pandiyan

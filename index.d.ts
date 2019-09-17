declare module "typy" {

	type SafeFunction = (...args: any[]) => any;

	export function t (obj: any, nestedKeys?: string): Typy;
	export function addCustomTypes(validators: {[key: string]: any}): any;
  export default t;

  interface SchemaType {
   Number: number;
   String: string;
   Boolean: boolean;
   Null: null;
   Undefined: undefined;
   Array: any[];
   Function: () => void;
  }

  export const Schema: SchemaType;

	class Typy {

		t: (obj: any, nestedKeys?: string) => Typy

		readonly isValid: boolean
		readonly isDefined: boolean
		readonly isUndefined: boolean
		readonly isNull: boolean
		readonly isNullOrUndefined: boolean
		readonly isBoolean: boolean
		readonly isTrue: boolean
		readonly isFalse: boolean
		readonly isTruthy: boolean
		readonly isFalsy: boolean
		readonly isObject: boolean
		readonly isEmptyObject: boolean
		readonly isString: boolean
		readonly isEmptyString: boolean
		readonly isNumber: boolean
		readonly isArray: boolean
		readonly isEmptyArray: boolean
    readonly isFunction: boolean
		readonly isDate: boolean
		readonly isSymbol: boolean
		readonly safeObject: any
		readonly safeObjectOrEmpty: any
		readonly safeString: string
		readonly safeNumber: number
		readonly safeBoolean: boolean
		readonly safeFunction: SafeFunction
		readonly safeArray: any[]

	}

}

const STRICT_MODE = {};
const NOT_EXIST_MESSAGE = 'Keypath is not exist';

export function delve<T = any>(
	obj: object | null | undefined,
	keypath: string | Array<string>,
	defaultValue?: T
): T | null | undefined {
	if (obj == null) {
		if (defaultValue === STRICT_MODE) {
			throw Error(NOT_EXIST_MESSAGE);
		}

		return defaultValue;
	}

	let value: any = obj;

	if (Array.isArray(keypath)) {
		for (let i = 0, l = keypath.length; i < l; i++) {
			value = value[keypath[i]];

			if (value == null) {
				if (i == l - 1) {
					return value;
				}

				if (defaultValue === STRICT_MODE) {
					throw Error(NOT_EXIST_MESSAGE);
				}

				return defaultValue;
			}
		}

		return value;
	}

	for (let index = 0; ; ) {
		let index2 = keypath.indexOf('.', index);

		if (index2 == -1) {
			return value[keypath.slice(index)];
		}

		value = value[keypath.slice(index, index2)];

		if (value == null) {
			if (defaultValue === STRICT_MODE) {
				throw Error(NOT_EXIST_MESSAGE);
			}

			return defaultValue;
		}

		index = index2 + 1;
	}
}

export function strictDelve<T = any>(
	obj: object | null | undefined,
	keypath: string | Array<string>
): T {
	return delve(obj, keypath, STRICT_MODE as any)!;
}

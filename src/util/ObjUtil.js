import MD5 from 'object-hash';
import _loadash from 'lodash';

export const isObject = (obj) => {
    if (typeof (obj) === 'object') {
        if (!Array.isArray(obj)) {
            return true;
        }
    }
    return false;
}

export const getObjectAsArray = (obj) => {
    if (isObject(obj)) {
        return [obj];
    }
    return obj;
}

export const findItemIndexById = (identifier, items) => {
    // TODO: use filter instead
    let index = null;
    for (let idx in items) {
        const itm = items[idx];
        if (itm.id === identifier) { index = idx; break; }
    }
    if (index !== null) { index = parseInt(index); }
    return index;
}

export const removeItemIndexByIndex = (idx, items) => {
    if (items && items.length) {
        return items.filter((_, i) => i !== idx) || [];
    }
    return [];
}

// https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-file-hash-in-javascript

export const md5 = (str) => {
    return MD5(str).toString();
}
/* NOTUSED
export const deepCopy = (inObject) => {
    let outObject, value, key
    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
    for (key in inObject) {
      value = inObject[key];
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopy(value);
    }
    return outObject
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}


export function compareDeep(obj1, obj2) {
    return _loadash.isEqual(obj1, obj2)
}
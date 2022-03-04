export const filteredList = (searchKey: string, items: any[]) => {
    if (!searchKey) {
        return items;
    }
    return items.filter((c: any) => {
        let passed = false;
        for (const key in c) {
            const value = c[key];
            if (value && typeof value === 'string' && value.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                passed = true;
            }
        }
        return passed;
    });
};

function parseDotNotation(str: string, val: any, obj: any) {
    let currentObj = obj,
        keys = str.split('.'),
        i, l = Math.max(1, keys.length - 1),
        key;

    for (i = 0; i < l; ++i) {
        key = keys[i];
        currentObj[key] = currentObj[key] || {};
        currentObj = currentObj[key];
    }

    currentObj[keys[i]] = val;
    delete obj[str];
}

export function dotToObject(obj: any) {
    for (let key in obj) {
        if (key.indexOf('.') !== -1) {
            parseDotNotation(key, obj[key], obj);
        }
    }
    return obj;
}

export function objectToDot(obj: any) {
    let res: any = {};
    (function recurse(obj, current) {
        for (let key in obj) {
            let value = obj[key];
            let newKey = (current ? current + '.' + key : key);
            if (value && typeof value === 'object') {
                // @ts-ignore
                recurse(value, newKey);
            } else {
                res[newKey] = value;
            }
        }
    })(obj);
    return res;
}

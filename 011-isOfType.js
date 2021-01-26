const { divider, log } = require('./utils');

{
  const isOfType = (() => {
    // create a plain object with no prototype
    const type = Object.create(null);
    // check for null type
    type.null = x => x === null;
    // check for undefined type
    type.undefined = x => x === undefined;
    // check for nil type. Either null or undefined
    type.nil = x => type.null(x) || type.undefined(x);
    const getType = x => !type.nil(x) && x.constructor.name.toLowerCase();
    type.object = x => ({}.toString.call(x) === '[object Object]');
    // check for number or number literal type. e.g: 12, 30.5, new Number()
    type.number = x =>
      !type.nil(x) && // NaN & Infinity have typeof "number" and this excludes that
      ((!isNaN(x) && isFinite(x) && typeof x === 'number') ||
        x instanceof Number);
    // check for provided type instance
    type.type = (x, X) => !type.nil(x) && x instanceof X;
    // check for set type
    type.set = x => type.type(x, Set);
    // check for map type
    type.map = x => type.type(x, Map);
    // check for date type
    type.date = x => type.type(x, Date);
    // check for strings and string literal type. e.g: 's', "s", `str`, new String()
    type.string = x => getType(x) === 'string';
    // type.array = x => getType(x) === 'array';
    type.array = x => !type.nil(x) && Array.isArray(x);
    // check for boolean or boolean literal type. e.g: true, false, new Boolean()
    type.boolean = x => getType(x) === 'boolean';
    return type;
  })();
  // all is true
  // console.log(isOfType.number(123));
  // console.log(isOfType.null(null));
  // console.log(isOfType.undefined(undefined));
  // console.log(isOfType.boolean(true));
  // console.log(isOfType.boolean(new Boolean()));
  // console.log(isOfType.array([1, 2, 3]));
  // console.log(isOfType.array(new Array()));
  // console.log(isOfType.object(Object.create(null)));
  // console.log(isOfType.type({}, Object));
  // console.log(isOfType.type([], Array));
}

{
  function isEmpty(x) {
    if (Array.isArray(x) || typeof x === 'string' || x instanceof String) {
      return x.length === 0;
    }

    if (x instanceof Map || x instanceof Set) {
      return x.size === 0;
    }

    if ({}.toString.call(x) === '[object Object]') {
      return Object.keys(x).length === 0;
    }

    return false;
  }

  console.log(isEmpty({}));
  console.log(isEmpty([]));
  console.log(isEmpty(new Set()));
  console.log(isEmpty(new Map()));
}

{
  function lastItem(list) {
    if (Array.isArray(list)) {
      return list.slice(-1)[0];
    }
    if (list instanceof Set) {
      return Array.from(list).slice(-1)[0];
    }
    if (list instanceof Map) {
      return Array.from(list.values()).slice(-1)[0];
    }
  }

  const s = new Set();
  s.add(1);
  s.add(10);
  s.add(100);
  console.log(lastItem([1, 2, 3]));
  console.log(lastItem(s));
}

{
  function lastItem(list) {
    if (Array.isArray(list)) {
      return list.slice(-1)[0];
    }

    if (list instanceof Set) {
      return Array.from(list).slice(-1)[0];
    }

    if (list instanceof Map) {
      return Array.from(list.values()).slice(-1)[0];
    }
  }

  console.log('lastItem([1, 2, 3]) :', lastItem([1, 2, 3]));
  console.log('lastItem([1, 2, 3]) :', lastItem());
}

{
  function isEmpty(x) {
    if (Array.isArray(x) || typeof x === 'string' || x instanceof String) {
      return x.length === 0;
    }

    if (x instanceof Map || x instanceof Set) {
      return x.size === 0;
    }

    if ({}.toString.call(x) === '[object Object]') {
      return Object.keys(x).length === 0;
    }

    return false;
  }

  console.log('isEmpty({}) :', isEmpty({}));
  console.log('isEmpty(null) :', isEmpty(null));
}

{
  // create unique id starting from current time in milliseconds
  // incrementing it by 1 everytime requested
  const uniqueId = (() => {
    const id = (function* () {
      let mil = new Date().getTime();

      while (true) yield (mil += 1);
    })();

    return () => id.next().value;
  })();

  // create unique incrementing id starting from provided value or zero
  // good for temporary things or things that id resets
  const uniqueIncrementingId = ((lastId = 0) => {
    const id = (function* () {
      let numb = lastId;

      while (true) yield (numb += 1);
    })();

    return (length = 12) => `${id.next().value}`.padStart(length, '0');
  })();

  // create unique id from letters and numbers
  const uniqueAlphaNumericId = (() => {
    const heyStack = '0123456789abcdefghijklmnopqrstuvwxyz';
    const randomInt = () =>
      Math.floor(Math.random() * Math.floor(heyStack.length));

    return (length = 24) =>
      Array.from({ length }, () => heyStack[randomInt()]).join('');
  })();
}

{
  const asyncSequentializer = (() => {
    const toPromise = x => {
      if (x instanceof Promise) {
        // if promise just return it
        return x;
      }

      if (typeof x === 'function') {
        // if function is not async this will turn its result into a promise
        // if it is async this will await for the result
        return (async () => await x())();
      }

      return Promise.resolve(x);
    };

    return list => {
      const results = [];

      return (
        list
          .reduce((lastPromise, currentPromise) => {
            return lastPromise.then(res => {
              results.push(res); // collect the results
              return toPromise(currentPromise);
            });
          }, toPromise(list.shift()))
          // collect the final result and return the array of results as resolved promise
          .then(res => Promise.resolve([...results, res]))
      );
    };
  })();
}

{
  const condition = false;
  console.log('condition', condition);
  const obj = {
    ...(condition === true ? { key: 'value' } : {}),
  };
  console.log('obj', obj);
}

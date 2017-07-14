import isPlainObject from 'lodash.isplainobject';
import proxyHandler from './proxy';

if (typeof Proxy === 'undefined') {
  throw new Error(`Domainer requires the Proxy object. Please consider using the 'proxy-polyfill' package.`)
}

// function isObject(obj) {
//   return obj === Object(obj) && !Array.isArray(obj);
// }

// options:
//   - plain: doesn't consider the input a domain descriptor
export default class Domainer {
  constructor(input, { plain } = {}) {
    const proxies = {};
    const middleware = [];

    if (!input) {
      throw new Error('You must define the `input` of the domain.');
    }

    this._store = {
      middleware,
    };

    if (!plain && isPlainObject(input)) {
      for (const name of Object.keys(input)) {
        proxies[name] = new Proxy(input[name], proxyHandler(middleware));
      }

      this._store.output = proxies;
    } else {
      this._store.output = new Proxy(input, proxyHandler(middleware));
    }
  }

  get export() {
    // const models = {}
    //
    // for (const name of Object.keys(this._store.models)) {
    //   models[name] = new Proxy(this._store.models[name], {
    //     get: proxyHandler(this, CLASS).get,
    //   });
    // }
    //
    // return models;
    return this._store.output;
  }

  // proxyGetter(target, name) {
  //   const [head, next] = this.middleware;
  //
  //   return head(next, target, { field: name }); // TODO! missing `context` & `info`
  // }

  use(middleware) {
    // if (typeof middleware !== 'function') { // TODO! check if instanceof Transmutter/Middleware
    //   throw new TypeError('middleware must be a function!');
    // }

    this._store.middleware.push(middleware);
    return this;
  }

  // context(data) {
  //   return new Context(this, data);
  // }
}

// resolve(next, root, args, context, info) {

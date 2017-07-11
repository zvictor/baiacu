import Context from './Context';
import proxyHandler from './proxy';
import { CLASS, ATTRIBUTE } from './types';

if (typeof Proxy === 'undefined') {
  throw new Error(`Domainer requires the Proxy object. Please consider using the 'proxy-polyfill' package.`)
}

export default class Domainer {
  constructor({ models, connectors }) {
    const proxies = {};
    const middleware = [];

    if (!models) {
      throw new Error('You must define the `models` of the domain.');
    }

    for (const name of Object.keys(models)) {
      proxies[name] = new Proxy(models[name], proxyHandler(middleware, ATTRIBUTE));
    }

    this._store = {
      middleware,
      models: new Proxy(proxies, proxyHandler(middleware, CLASS)),
    };
  }

  get models() {
    // const models = {}
    //
    // for (const name of Object.keys(this._store.models)) {
    //   models[name] = new Proxy(this._store.models[name], {
    //     get: proxyHandler(this, CLASS).get,
    //   });
    // }
    //
    // return models;
    return this._store.models;
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

import Context from './Context';
import proxy from './proxy';

export default class Domainer {
  constructor({ models, connectors }) {
    this._store = {
      models: {},
      middleware: [],
    };
  }

  get models() {
    const models = {}

    for (const name of Object.keys(this._store.models)) {
      models[name] = new Proxy(this._store.models[name], proxy(this, null));
    }
  }

  // proxyGetter(target, name) {
  //   const [head, next] = this.middleware;
  //
  //   return head(next, target, { field: name }); // TODO! missing `context` & `info`
  // }

  use(middleware) {
    if (typeof middleware !== 'function') {
      throw new TypeError('middleware must be a function!');
    }

    this._store.middleware.push(middleware);
    return this;
  }

  context(data) {
    return new Context(this, data);
  }
}

// resolve(next, root, args, context, info) {

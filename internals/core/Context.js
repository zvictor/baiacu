import proxy from './proxy';

export default class Context {
  constructor(domain, data) {
    this._store = {
      domain,
      data,
    };
  }

  get models() {
    const { domain, data } = this._store;
    const models = {}

    for (const name of Object.keys(domain.models)) {
      models[name] = new Proxy(domain.models[name], proxy(domain, data));
    }
  }

  // proxyGetter(target, name) {
  //   const [head, next] = this.middleware;
  //
  //   return head(next, target, { field: name }); // TODO! missing `context` & `info`
  // }

  use(middleware) {
    throw new Error('Domain cannot be changed from the context object.');
  }

  context(data) {
    return new Context(this._store.domain, data);
  }
}

// resolve(next, root, args, context, info) {

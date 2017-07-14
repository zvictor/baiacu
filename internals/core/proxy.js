function proxifier(middleware) {
  if (!middleware) {
    throw new Error('missing `middleware`');
  }

  return {
    construct(target, args) {
      if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware stack must be an array!')
      }

      // let instance = target.prototype.apply(args); // TODO! use some sort of `apply`
      // let instance = target.prototype.constructor.apply(target, args);

      // let instance = Object.create(target.prototype);
      // instance = target.apply(instance, args);

      // let instance = Reflect.construct(target, args);
      let response;

      for (const transmutter of middleware) {
        // if (typeof transmutter !== 'function') { // TODO! check if instanceof Transmutter/Middleware
        //   throw new TypeError('Middleware must be composed of functions!')
        // }

        const method = transmutter.construct;
        if (typeof method !== 'function') {
          continue;
        }

        response = method.call(transmutter, target, response, args);
      }

      if (!response) {
        response = new Proxy(new target(...args), proxifier(middleware));
      }

      // return this.get(target, 'constructor', instance);
      return response;
    },
    get(target, property, receiver) {
      if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware stack must be an array!')
      }

      let response;
      // let response = Reflect.get(target, property, receiver);

      for (const transmutter of middleware) {
        const method = transmutter.get;
        if (typeof method !== 'function') {
          continue;
        }

        // resolve(original, { field }, context, info)
        // transmutter.get(target, refined, query, context);
        response = method.call(transmutter, target, property, response);
      }

      return response;
    },
    set(target, property, value) {
      if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware stack must be an array!')
      }

      for (const transmutter of middleware) {
        const method = transmutter.set;
        if (typeof method !== 'function') {
          continue;
        }

        value = method.call(transmutter, target, property, value);
      }

      return Reflect.set(target, property, value);
    },
  }
};

export default proxifier;

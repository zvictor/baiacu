import { CLASS } from '../core/types';

export default middleware => (target, property, receiver) => {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!')
  }

  // let source = Reflect.get(target, property, receiver);
  const proxy = {};

  for (const transmutter of middleware) {
    // if (typeof transmutter !== 'function') { // TODO! check for instance of Transmutter/Middleware
    //   throw new TypeError('Middleware must be composed of functions!')
    // }

    const method = transmutter[CLASS];
    if (typeof method !== 'function') {
      continue;
    }

    const response = method(target, property, proxy[property], proxy);
    if (response !== undefined) {
      proxy[property] = response;
    }
  }

  return proxy[property];
}

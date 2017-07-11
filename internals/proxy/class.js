import { CLASS } from '../core/types';

export default middleware => (target, property, receiver) => {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!')
  }

  let source = Reflect.get(target, property, receiver);
  let response;

  for (const transmutter of middleware) {
    // if (typeof transmutter !== 'function') { // TODO! check for instance of Transmutter/Middleware
    //   throw new TypeError('Middleware must be composed of functions!')
    // }

    const method = transmutter[CLASS];
    if (typeof method !== 'function') {
      continue;
    }

    response = method(source, response);
  }

  return response;
}

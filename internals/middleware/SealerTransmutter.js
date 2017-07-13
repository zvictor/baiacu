export default class SealerTransmutter{
  class(source, property, response, proxy) {
    if (source[property]) {
      Object.freeze(source[property]);

      if (source[property].prototype) {
        Object.freeze(source[property].prototype);
      }
    }
  }

  instance(source, response, args) {
    Object.freeze(source);
    Object.freeze(source.prototype);

    if (response) {
      return response;
    }

    return new source(...args);
  }
}

export default class SealerTransmutter{
  // construct(source, property, response, proxy) {
  //   debugger;
  //   if (source[property]) {
  //     Object.freeze(source[property]);
  //
  //     if (source[property].prototype) {
  //       Object.freeze(source[property].prototype);
  //     }
  //   }
  // }

  // get(source, property, response, proxy) {
  //   // debugger;
  //   Object.freeze(source);
  //   Object.freeze(source.prototype);
  //
  //   if (response) {
  //     return response;
  //   }
  //
  //   return new source(...args);
  // }

  set(source, property, response) {
    // debugger;
    throw new TypeError('objects proxied by the SealerTransmutter cannot be modified.');
    // console.log({ source, property, response });
    // Object.freeze(source);
    // console.log({ isFrozen: Object.isFrozen(source), merda: source[property] });
    // Object.freeze(source.prototype);

    return response;
  }
}

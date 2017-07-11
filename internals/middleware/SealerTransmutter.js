export default class SealerTransmutter{
  class(source, property, response, proxy) {
    Object.freeze(source[property]);
    Object.freeze(source[property].prototype);
  }

  // instance(source, args, response) {
  //   Object.seal(response);
  //   Object.seal(response.prototype);
  //
  //   return response;
  // }
}

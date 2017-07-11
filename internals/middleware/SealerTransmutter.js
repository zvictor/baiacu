export default class SealerTransmutter{
  class(source, response) {
    // debugger;
    // if (response === source) {
    //   response = Object.assign({}, source);
    //   response.prototype = Object.assign({}, source.prototype);
    // }

    Object.freeze(source);
    Object.freeze(source.prototype);

    return response;
  }

  // instance(source, args, response) {
  //   Object.seal(response);
  //   Object.seal(response.prototype);
  //
  //   return response;
  // }
}

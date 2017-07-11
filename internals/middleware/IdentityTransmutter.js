export default class IdentityTransmutter{
  class(source, property, response, proxy) {
    // if (response !== undefined) {
    //   throw new Error('IdentityTransmutter must be the first middleware to be executed');
    // }

    return Reflect.get(source, property, proxy);
  }

  // instance(source, args, response) {
  //   proxy[property] = Reflect.construct(source, args);
  // }

  attribute(source, property, response, proxy) {
    return Reflect.get(source, property, proxy);
  }
}

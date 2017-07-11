export default class IdentityTransmutter{
  class(source, response) {
    // if (response) {
    //   throw new Error('IdentityTransmutter must be the first middleware to be executed');
    // }

    return source;
  }

  instance(source, args, response) {
    return Reflect.construct(source, args);
  }

  attribute(source, property, response) {
    return Reflect.get(source, property, this);
  }
}

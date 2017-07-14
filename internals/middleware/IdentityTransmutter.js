export default class IdentityTransmutter{
  construct(source, property, response) {
    // if (response !== undefined) {
    //   throw new Error('IdentityTransmutter must be the first middleware to be executed');
    // }

    return Reflect.get(source, property);
  }

  // instance(source, args, response) {
  //   proxy[property] = Reflect.construct(source, args);
  // }

  get(source, property, response) {
    return Reflect.get(source, property);
  }
}

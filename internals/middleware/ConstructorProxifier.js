// import proxyHandler from '../core/proxy';
// import { INSTANCE } from '../core/types';
//
// export default class ConstructorProxifier {
//   constructor(domain) {
//     this.domain = domain;
//     debugger
//   }
//
//   class(source, property, receiver) {
//     /// Recursividade!
//     // `source.prototype` vai chamar o proxy handler mais uma vez, criando um loop
//     debugger;
//     receiver.prototype.constructor = new Proxy(source.prototype.constructor, proxyHandler(this.domain, INSTANCE));
//   }
// }

// import test from 'ava';
// import Domainer, { Model } from '../internals';
//
// class Person extends Model {
//   get name() {
//     return `${this._store.firstName} ${this._store.lastName}`;
//   }
// }
//
// class Author extends Person {
//   get name() {
//     return `${this._store.lastName}, ${this._store.firstName}`;
//   }
// }
//
// const { models } = new Domainer({
//   models: {
//     Person,
//     Author,
//   }
// });
//
// test('allows access to raw values in the store', t => {
//   const individual = new models.Author({
//     firstName: 'George',
//     lastName: 'Orwell',
//   });
//
//   t.is(individual._store.firstName, 'George');
//   t.is(individual._store.lastName, 'Orwell');
// });
//
// test('has support for defined getters', t => {
//   const reader = new models.Person({
//     firstName: 'Joe',
//     lastName: 'Doe',
//   });
//
//   const writer = new models.Author({
//     firstName: 'George',
//     lastName: 'Orwell',
//   });
//
//   t.is(reader.name, 'Joe Doe');
//   t.is(writer.name, 'Orwell, George');
// });

import test from 'ava';
import Domainer from '../internals';
import { IdentityTransmutter, SealerTransmutter } from '../internals/middleware';

class Person {
  constructor({ firstName, lastName }) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static get species() {
    return 'Homo sapiens sapiens';
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  isMe(context) {
    return this._id === context.userId;
  }
}

class Author extends Person {
  get name() {
    return `${this.lastName}, ${this.firstName}`;
  }
}

const { models } = new Domainer({
  models: {
    Person,
    Author,
  },
})
.use(new IdentityTransmutter());

test('has accessors/getters pointing to the original fields', t => {
  const individual = new models.Person({
    firstName: 'George',
    lastName: 'Orwell',
  });

  t.is(individual.firstName, 'George');
  t.is(individual.lastName, 'Orwell');
});

test('has support for defined getters', t => {
  const reader = new models.Person({
    firstName: 'Joe',
    lastName: 'Doe',
  });

  const writer = new models.Author({
    firstName: 'George',
    lastName: 'Orwell',
  });

  t.is(reader.name, 'Joe Doe');
  t.is(writer.name, 'Orwell, George');
});

// test('has methods dependent on context', t => {
//   const individual = new models.Author({
//     _id: 1,
//   });
//
//   // TODO! requires context to become {} if undefined
//   t.is(individual.isMe(), false);
//   t.is(individual.isMe({ userId: 1 }), true);
//   t.is(individual.isMe({ userId: 2 }), false);
// });

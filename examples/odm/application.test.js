import _ from 'lodash';
import test from 'ava';
import Datastore from 'nedb';
import Domainer from 'baiacu';
import promisify from 'promisify-node';
import Manager from 'baiacu-managers-mongodb';
import { IdentityTransmutter } from 'baiacu/middleware';
import * as models from './models';

const collections = {}
const connection = {
  databaseName: 'in-memory',
  collection: name => {
    if (!collections[name])
      collections[name] = new Datastore({
        inMemoryOnly: true,
        autoload: true,
      })

    return collections[name]
  },
};

const { Person, Author } = new Domainer(models)
  .use(new IdentityTransmutter())
  .use({
    get(source, property, response) {
      if (property !== 'collection')
        return response;

      return source.name.toLowerCase();
    }
  })
  .use(new Manager({ connection }))
  .export;

test.before(async t => {
  await promisify(Person.objects.insert).call(Person.objects, {
    firstName: 'Carlos',
    lastName: 'Silva',
  });

  await promisify(Author.objects.insert).call(Author.objects, {
    firstName: 'Richard',
    lastName: 'Dawkins',
  });
});

test('it should load the inserted data', async t => {
  const people = await promisify(Person.objects.find).call(Person.objects, {});
  const authors = await promisify(Author.objects.find).call(Author.objects, {});

  t.is(people.length, 1);
  t.is(authors.length, 1);
  t.is(people[0].firstName, 'Carlos');
  t.is(authors[0].firstName, 'Richard');
});

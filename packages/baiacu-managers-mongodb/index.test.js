import test from 'ava';
import Domainer from 'baiacu';
import { MongoClient } from 'mongodb';
import { IdentityTransmutter } from 'baiacu/middleware';
import Manager from './index';

let connection;
let manager;
let Model;

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Hooks                                                                                          //
// /////////////////////////////////////////////////////////////////////////////////////////////////
test.before('mongodb should connect', async t => {
  connection = await MongoClient.connect('mongodb://localhost:27017/tests');
  manager = new Manager({connection});
  Model = new Domainer(class Model {
    static collection = 'baiacu-managers-mongodb'
  })
    .use(new IdentityTransmutter())
    .use(manager)
    .export;
});

test.after('mongodb connection should be closed', async t => {
  await connection.close();
});

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Tests                                                                                          //
// /////////////////////////////////////////////////////////////////////////////////////////////////
test('manager should select right collection', async t => {
  t.is(Model.objects.collectionName, Model.collection);
});

test.serial('manager should be able to find content', async t => {
  const content = await Model.objects.find().toArray();
  t.is(content.length, 0);
});

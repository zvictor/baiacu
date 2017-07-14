import test from 'ava';
import { MongoClient } from 'mongodb';
import Manager from './manager';

let connection;
const collection = 'baiacu-managers-mongodb'

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Hooks                                                                                          //
// /////////////////////////////////////////////////////////////////////////////////////////////////
test.before('mongodb should connect', async t => {
  connection = await MongoClient.connect('mongodb://localhost:27017/tests');
});

test.after('mongodb connection should be closed', async t => {
  await connection.close();
});

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Tests                                                                                          //
// /////////////////////////////////////////////////////////////////////////////////////////////////
test('manager should select right collection', async t => {
  const manager = new Manager({connection, collection});

  t.is(manager.collection.collectionName, collection);
});

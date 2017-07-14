import { Person, Author } from './domain';
import { DATABASE_NAME, MONGO_URL } from './constants';
import connection from './storage';

console.log(`
Welcome to the ODM example.
This application will be loading data from a mongodb database (make sure you have it running locally) and printing it in the console.

The enviromment should look like this:
  MONGO_URL: ${MONGO_URL}
  DATABASE_NAME: ${DATABASE_NAME}
`);

async function main() {
  const people = await Person.objects.find().toArray();
  const authors = await Author.objects.find().toArray();

  console.log(`* ${people.length} person(s) were found`);
  if (people.length)
    console.log(JSON.stringify(people, null, 2));

  console.log(`* ${authors.length} author(s) were found`);
  if (authors.length)
    console.log(JSON.stringify(authors, null, 2));

  console.log(`
  Please consider adding more data to your database, as follow, then run this script again:

  $ mongo ${MONGO_URL}
    db.${Person.collection}.insert({
      firstName: 'John',
      lastName: 'Doe'
    })

    db.${Author.collection}.insert({
      firstName: 'George',
      lastName: 'Orwell'
    })
  `);
}

connection
  .then(main)
  .then(() => {
    process.exit()
  })
  .catch(e => setTimeout(() => {
    throw e;
  }));

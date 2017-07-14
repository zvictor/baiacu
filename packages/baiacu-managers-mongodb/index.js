export default class MongodbManager{
  constructor(options = {}) {
    options.attribute = options.attribute || 'objects';

    if (Promise.resolve(options.connection) == options.connection) {
      options.connection
        .then(db => this.db = db)
        .catch(e => setTimeout(() => {
          throw new Error(`MongodbManager could not find an ative connection to the database.`);
        }))
    }
    else if (!options.connection || !options.connection.databaseName) {
      throw new Error(`MongodbManager could not find an ative connection to the database.`)
    } else {
      this.db = options.connection;
    }

    options.collection = options.collection || '' // defaults to empty string
    this.options = options;
  }

  get(source, property, response, proxy) {
    if (property !== this.options.attribute) {
      return response;
    }

    if (!this.db) {
      throw new Error('database connection has not been initialized properly.');
    }

    return this.db.collection(proxy.collection);
  }
}

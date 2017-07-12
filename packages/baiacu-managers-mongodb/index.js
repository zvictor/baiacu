export default class MongodbManager{
  constructor(options = {}) {
    // options.host = options.host || 'localhost' // defaults to `localhost` if omitted
    // options.port = options.port || 27017 // defaults to 27017 if omitted
    // options.user = options.user || 'admin' // defaults to 'admin' if omitted
    // options.password = options.password || '' // defaults to empty string
    // options.database = options.database || '' // defaults to empty string
    if (!options.connection || !options.connection.databaseName) {
      throw new Error(`MongodbManager could not find an ative connection to the database.`)
    }

    options.collection = options.collection || '' // defaults to empty string
    this.options = options;

    // const mongoUrl = `mongodb://${this.options.host}:${this.options.port}/${this.options.database}`;
    // this.connection = MongoClient.connect(mongoUrl);
    this.db = options.connection;
    this.collection = this.db.collection(options.collection);
  }

  // get collection() {
  //   return this.db.collection(this.options.collection);
  // }
}

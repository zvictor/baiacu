import { MongoClient } from 'mongodb';
import { MONGO_URL } from './constants';

export default MongoClient.connect(MONGO_URL);

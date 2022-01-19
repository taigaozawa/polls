import { MongoClient, Db } from "mongodb";

const url = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

let cachedClient: MongoClient;
let cachedDb: Db;

export const connectToDb = async () => {
  if(cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb
    }
  }
  if (!url || !dbName) throw new Error('No url or dbName.');
  
  const client = new MongoClient(url);
  await client.connect();
  const db= client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb
  }
  
}
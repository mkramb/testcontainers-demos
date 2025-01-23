import { MongoClient, Db, ObjectId } from "mongodb";

let client: MongoClient;

export const connectToDatabase = async (
  uri: string,
  dbName: string
): Promise<Db> => {
  client = new MongoClient(uri, { directConnection: true });
  await client.connect();

  return client.db(dbName);
};

export const insertRecord = async (
  db: Db,
  collectionName: string,
  record: Record<string, any>
): Promise<ObjectId> => {
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(record);

  return result.insertedId;
};

export const findRecord = async (
  db: Db,
  collectionName: string,
  query: Record<string, any>
): Promise<any> => {
  const collection = db.collection(collectionName);

  return collection.findOne(query);
};

export const closeConnection = async (): Promise<void> => {
  if (client) await client.close();
};

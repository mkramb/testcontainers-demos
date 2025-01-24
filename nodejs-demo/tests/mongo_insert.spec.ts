import { Db } from "mongodb";

import {
  connectToDatabase,
  insertRecord,
  closeConnection,
} from "../src/mongo-service";
import { geRandomDatabaseName } from "../tests-utils/mongo-utils";

describe("MongoDB Test for Insert", () => {
  let db: Db;

  beforeAll(async () => {
    const uri = process.env.MONGO_URI;
    db = await connectToDatabase(uri, geRandomDatabaseName());
  });

  afterAll(async () => {
    await closeConnection();
  });

  test("should be able to insert user record", async () => {
    const collectionName = "users";

    await db.collection(collectionName).deleteMany({});
    await insertRecord(db, collectionName, { name: "Test User A", age: 60 });
    await insertRecord(db, collectionName, { name: "Test User B", age: 80 });

    const users = await db.collection(collectionName).find().toArray();

    expect(users).toHaveLength(2);
    expect(users[0].name).toBe("Test User A");
    expect(users[1].name).toBe("Test User B");
  });
});

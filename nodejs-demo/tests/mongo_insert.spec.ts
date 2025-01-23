import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from "@testcontainers/mongodb";
import { Db } from "mongodb";

import { connectToDatabase, insertRecord, closeConnection } from "../src/mongo";

describe("MongoDB Test for Insert", () => {
  let container: StartedMongoDBContainer;
  let db: Db;

  beforeAll(async () => {
    container = await new MongoDBContainer().start();
    db = await connectToDatabase(container.getConnectionString(), "testdb");
  });

  afterAll(async () => {
    await closeConnection();
    await container.stop();
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

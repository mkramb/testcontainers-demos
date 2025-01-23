import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from "@testcontainers/mongodb";
import { Db } from "mongodb";

import { connectToDatabase, findRecord, closeConnection } from "../src/mongo";

describe("MongoDB Test for Find", () => {
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

  test("should be able to find record", async () => {
    const collectionName = "users";

    await db.collection(collectionName).deleteMany({});
    await db.collection(collectionName).insertMany([
      { name: "Test User A", age: 60 },
      { name: "Test User B", age: 80 },
    ]);

    const user = await findRecord(db, collectionName, { name: "Test User A" });

    expect(user).not.toBeNull();
    expect(user.name).toBe("Test User A");
    expect(user.age).toBe(60);
  });
});

import { Db } from "mongodb";

import {
  connectToDatabase,
  findRecord,
  closeConnection,
} from "../src/mongo-service";
import { geRandomDatabaseName } from "../tests-utils/mongo-utils";

describe("MongoDB Test for Find", () => {
  let db: Db;

  beforeAll(async () => {
    const uri = process.env.MONGO_URI;
    db = await connectToDatabase(uri, geRandomDatabaseName());
  });

  afterAll(async () => {
    await closeConnection();
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

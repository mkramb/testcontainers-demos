const { MongoDBContainer } = require("@testcontainers/mongodb");

let mongoContainer;

module.exports = async () => {
  console.log(`\nStarting MongoDB container\n`);
  mongoContainer = await new MongoDBContainer().start();

  process.env.MONGO_URI = mongoContainer.getConnectionString();
  global.__MONGO_CONTAINER__ = mongoContainer;
};

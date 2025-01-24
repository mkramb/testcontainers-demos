const { MongoDBContainer } = require("@testcontainers/mongodb");
const { NatsContainer } = require("@testcontainers/nats");

let mongoContainer;
let natsContainer;

module.exports = async () => {
  // mongo
  console.log(`Starting MongoDB container`);
  mongoContainer = await new MongoDBContainer().start();

  process.env.MONGO_URI = mongoContainer.getConnectionString();
  global.__MONGO_CONTAINER__ = mongoContainer;

  // nats
  console.log(`Starting Nats container`);
  natsContainer = await new NatsContainer()
    .withExposedPorts(4222)
    .withJetStream()
    .start();

  const natsHost = natsContainer.getHost();
  const natsPort = natsContainer.getMappedPort(4222);

  process.env.NATS_URI = `nats://${natsHost}:${natsPort}`;
  process.env.NATS_USER = "test";
  process.env.NATS_PASS = "test";

  global.__NATS_CONTAINER__ = natsContainer;
};

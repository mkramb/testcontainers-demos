module.exports = async () => {
  if (global.__MONGO_CONTAINER__) {
    console.log(`Stopping MongoDB container`);
    await global.__MONGO_CONTAINER__.stop();
  }

  if (global.__NATS_CONTAINER__) {
    console.log(`Stopping Nats container`);
    await global.__NATS_CONTAINER__.stop();
  }
};

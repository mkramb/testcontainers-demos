module.exports = async () => {
  console.log(`\nStopping MongoDB container\n`);

  if (global.__MONGO_CONTAINER__) {
    await global.__MONGO_CONTAINER__.stop();
  }
};

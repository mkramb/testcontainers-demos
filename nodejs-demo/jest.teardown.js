module.exports = async () => {
  if (global.__MONGO_CONTAINER__) {
    console.log(`\nStopping MongoDB container\n`);
    await global.__MONGO_CONTAINER__.stop();
  }
};

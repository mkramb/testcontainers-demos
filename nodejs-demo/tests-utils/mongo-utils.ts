export const geRandomDatabaseName = () => {
  const random = (Math.random() + 1).toString(36).substring(7);
  return `testdb_${random}`;
};

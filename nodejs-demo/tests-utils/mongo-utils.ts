export const geRandomDatabaseName = () => {
  const randomPrefix = (Math.random() + 1).toString(36).substring(7);
  return `testdb_${randomPrefix}`;
};

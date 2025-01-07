import Database from "bun:sqlite";

export const executeQuery = (query: string) => {
  const database = new Database("inventory_database.db", {
    create: true,
    strict: true,
  });
  const result = database.query(query).all();

  database.close();

  return result;
};

export const runQuery = (query: string) => {
  const database = new Database("inventory_database.db", {
    create: true,
    strict: true,
  });
  const result = database.query(query).run();

  database.close();

  return result;
};

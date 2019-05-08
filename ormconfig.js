require('custom-env').env(true);

console.log(process.env.DB_TYPE);

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  dropSchema: false,
  logging: true,
  migrationsRun: true,
  entities: [process.env.DB_ENTITIES_DIR],
  migrations: [process.env.DB_MIGRATIONS_DIR],
  subscribers: [process.env.DB_SUBS_DIR],
  cli: {
    entitiesDir: process.env.DB_CLI_DIR,
    migrationsDir: process.env.DB_CLI_MIGRATIONS_DIR,
    subscribersDir: process.env.DB_CLI_SUBS_DIR,
  },
};

const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "nc_news",
      username: "andrew",
      password: "password"
    },
    production: {
      connection: `${DB_URL}?ssl=true`,
      database: "nc_news",
      username: "andrew",
      password: "password"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: "andrew",
      password: "password"
    }
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

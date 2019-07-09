# THE news.

THE news is a responsive web app project, built with React and styled using the Material UI library. Inspired by Reddit, it serves as a news aggregation and commentary board.

The back end, nc-news, utilises a RESTful API which allows access to a PSQL database.

The deployed API for the back end can be found here: https://ab-nc-news.herokuapp.com/api

The deployed version of THE news app can be found here: NETLIFY LINK HERE
The github repo for the front end can be found here: https://github.com/burnsAndrew/the-news

## Getting Started

### Prerequisites

```
Node.js
PostgreSQL
```

### Installing

1. Fork and clone down this .git repository

```
git clone https://github.com/burnsAndrew/nc-news.git
```

2. Navigate inside the folder and install all dependencies:

```
npm install
```

3. For testing and developement, you will need to create a knexfile.js; please add to your .gitignore file.

```js
const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

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
      database: "nc_news"
      // username: "" << linux users only
      // password: "" << linux users only
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      // username: "", << linux users only
      // password: "", << linux users only
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

4. Ensure you have PostgreSQL running.
5. Seed your database:

```
npm run seed
```

6. You can then run the application by typing `npm run dev` into your terminal which will start up a local server.
7. Open your web browser and navigate to localhost:9090/api. This will give you a list of possible API endpoints, all of which you can navigate to.

## Testing

All tests are run using mocha, chai and supertest. The tests check all API endpoints and automatically reseeds the test database before each test is run. All tests can be run using:

```
npm test
```

## Built With

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)

## Author

[Andrew Burns](https://github.com/burnsAndrew)

## Acknowledgements

[Northcoders](https://northcoders.com/)

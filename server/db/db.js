const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  database: "lunchdb",
  password: "1360",
});

pool.connect((err) => {
  if (err) {
    console.log("connection error", err.stack);
  } else {
    console.log("database connected");
  }
});

module.exports = pool;

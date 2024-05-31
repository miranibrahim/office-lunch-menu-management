const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect((err) => {
  if (err) {
    console.log("connection error", err.stack);
  } else {
    console.log("database connected");
  }
});

module.exports = pool;

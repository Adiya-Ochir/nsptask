// const { response } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "qwer",
  database: "Pets",
});
pool.connect();
module.exports = pool;
// const createTable = `CREATE TABLE Users(
//     user_id serial PRIMARY KEY,
//     username VARCHAR (50) UNIQUE NOT NULL,
//     email VARCHAR (50) UNIQUE NOT NULL,
//     status INT
// );`;

// pool
//   .query(createTable)
//   .then((Response) => {
//     console.log("Table Created");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool.connect();
// console.log("pool", pool);
// pool.query(`Select * From data_mans`, (err, res) => {
//   if (!err) {
//     console.log(res.rows);
//   } else {
//     console.log(err.message);
//   }
//   pool.end;
// });

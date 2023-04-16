const { Client } = require("pg");
const dotenv = require("dotenv");
// const ethers = require("ethers");

dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false
    }
});

 client.connect();



const txdata = async (b, c, d, e, f, g, h, i, j, k, l, m, n) => {
  try {
    //   await client.connect();           // gets connection
    await client.query(
      `INSERT INTO "Transaction" ("hash","blockNumber","confirmations","from","gasPrice","to","value","nonce","chainId","status","timestamp","gasUsed","gasLimit")  
                 VALUES ($1, $2, $3,$4,$5,$6,$7,$8, $9, $10,$11,$12,$13)`,
      [b, c, d, e, f, g, h, i, j, k, l, m, n]
    ); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    await client.end();
    return false;
  }

};



const fetchTran = async (a, b) => {
  try {
    const data = await client.query(
      `SELECT * FROM "Transaction" ORDER BY "id" DESC  OFFSET $1 LIMIT $2`,
      [a - 1, b - a + 1]
    );
    console.log(data.rows);
    return data.rows;
  } catch (e) {
    return e;
  }
};

const addressdetail = async (a, b, c) => {
  try {
    const data = await client.query(
      `SELECT * FROM "Transaction" WHERE "to"=$1  OR "from"=$1  ORDER BY "id" DESC OFFSET $2 LIMIT $3 `,
      [a, b - 1, c - b + 1]
    );
    console.log(data);
    return data.rows;
  } catch (e) {
    return e;
  }
};



















module.exports = {

  txdata,
  fetchTran,
  addressdetail
};

const fs = require('fs');

require('dotenv').config()

const conn = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: parseInt(process.env.PGPORT),
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.PGCERTIFICATE,
    },
}

const { Pool } = require('pg');
const e = require('express');

const pool = new Pool(conn)
console.log("Connected to the database.")

let a = `
INSERT INTO "Categories" VALUES
    (0002, 'Purses', 'purses', '0002-cat.jpg');
    `

let b = `
    INSERT INTO "Products" VALUES
        (
          0003, 
          'purses', 
          'this is a product description and its long so i can check wrap.', 
          'This description shows up on the product page and is a lot bigger than the one on the category page because the space we need to fill is much bigger!',
          'Black purse',
          105.51,
          '0001-1.jpg',
          '0001-2.jpg',
          '0001-3.jpg',
          '0001-4.jpg',
          19
          );
        `

let c = `
UPDATE "Products"
SET "Category" = 'handbags'
WHERE "PID" = 1;
`

let run = function (query){
  pool.query(query, (err, res) => {
    console.log(err, res);
  })
}

let rows = function(query, params){
  return new Promise(resolve => {
    pool.query(query, params, (err, res) => {
      if(err){
        console.log(err);
      }
      else resolve(res.rows);
    })
  })
}

module.exports = {
  rows : rows,
  run: run
}

//run(b)

/*run(`CREATE TABLE "Orders" (
  "Ref" int   UNIQUE NOT NULL,
  "PinPay" varchar (256) NOT NULL,
  "PID" integer ARRAY   NOT NULL,
  "Address" varchar (256)   NOT NULL,
  "Email" varchar (64)   NOT NULL,
  "Phone" int   NOT NULL,
  "Comment" varchar (256)   NOT NULL,
  "Date" timestamp   NOT NULL,
  "FName" varchar (32)   NOT NULL,
  "LName" varchar (32)   NOT NULL,
  "Bumped" boolean   NOT NULL,
  CONSTRAINT "pk_Orders" PRIMARY KEY (
      "Ref"
   )
);`)*/

rows(`SELECT * FROM "Users"`).then(res => {
  console.log(res);
})

/*
createHash("L3moonSqueez1").then(pass => {
  run(`INSERT INTO "Users" VALUES(${uid}, 'n.v1', '${pass}', true);`)
})*/
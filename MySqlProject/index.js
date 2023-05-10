const express = require("express");
const mysql = require("mysql2");

const connectionMySql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "mysqlDB",
});

connectionMySql.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    var parentTableSQL =
      "CREATE TABLE IF NOT EXISTS parent_table (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255))";
    var childTableSQL =
      "CREATE TABLE IF NOT EXISTS child_table (id INT PRIMARY KEY AUTO_INCREMENT, parent_id INT, value VARCHAR(255), FOREIGN KEY (parent_id) REFERENCES parent_table(id))";

    connectionMySql.query(parentTableSQL, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Parent table created successfully");
      }
    });

    connectionMySql.query(childTableSQL, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Child table created successfully");
      }
    });

    connectionMySql.query(
      "INSERT INTO parent_table (name) VALUES ('John'), ('Emily'), ('Adam')",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Records added to parent_table successfully");
        }
      }
    );

    connectionMySql.query(
      "INSERT INTO child_table (parent_id, value) VALUES (1, 'Value1'), (1, 'Value2'), (2, 'Value3')",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Records added to child_table successfully");
        }
      }
    );
  }
});

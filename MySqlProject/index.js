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
      "INSERT INTO parent_table (name) VALUES ('John'), ('Emily'), ('Adam'),('Raluca'), ('Prince'),('Jack'), ('Lucian')",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Records added to parent_table successfully");
        }
      }
    );

    connectionMySql.query(
      "INSERT INTO child_table (parent_id, value) VALUES (1, 'Anton'), (1, 'Mihai'), (2, 'Raluca'), (2, 'Maria'), (2, 'Rebeca')",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Records added to child_table successfully");
        }
      }
    );

    connectionMySql.query(
      "INSERT INTO parent_table (name) VALUES ('Andrew')",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Records added to parent_table successfully");
        }
      }
    );
    var createViewSQL =
      "CREATE VIEW family AS SELECT parent_table.name FROM parent_table JOIN child_table ON parent_table.id = child_table.parent_id";
    connectionMySql.query(createViewSQL, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("View created successfully");
      }
    });
  }
});

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mysql://username:password@localhost:3306/mydatabase');

// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// async function getUserByEmail(email) {
//   const user = await User.findOne({ where: { email } });
//   return user;
// }

// (async () => {
//   await sequelize.sync();
//   const user = await getUserByEmail('example@example.com');
//   console.log(user.name);
// })();


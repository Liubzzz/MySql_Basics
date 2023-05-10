const express = require("express");
const mysql = require("mysql");

const connectionMySql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
});

import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    throw err;
    return;
  }
  console.log("Connected to database");
});

// seeTableElements("users", "username");
// setTableValues(["username", "password", "email"], "users", [
//   `'ricardo', 'ricardo123', 'ricardo@hola.com'`,
// ]);
// seeFirstElement("users");
// seeLastElement("users");
//que sea el ultimo id de la tabla

// updateElement("users", "username", "totokorzu", "id = 1");

function seeTableElements(tableName, selection) {
  const element = `SELECT ${selection} FROM ${tableName}`;
  connection.query(element, (err, list) => {
    if (err) {
      throw err;
    } else {
      console.log(list);
    }
  });
}

function setTableValues(columns, table, columnsValues) {
  const element = `INSERT INTO ${table} (${columns}) VALUES (${columnsValues})`;
  connection.query(element, (err, rows) => {
    if (err) {
      throw errlist;
    } else {
      console.log("column values sended correctly");
    }
  });
}
function seeFirstElement(tableName) {
  const element = `SELECT * FROM ${tableName} ORDER BY id ASC LIMIT 1`;
  connection.query(element, (err, list) => {
    if (err) {
      throw err;
    } else {
      console.log("The First Element is: ");
      console.log(list);
    }
  });
}
function seeLastElement(tableName) {
  const element = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`;
  connection.query(element, (err, list) => {
    if (err) {
      throw err;
    } else {
      console.log("The last Element is: ");
      console.log(list);
    }
  });
}

//change elements
function updateElement(tableName, column, value, condition) {
  const element = `UPDATE ${tableName} SET ${column} = ${value} WHERE ${condition}`;
  connection.query(element, (err, list) => {
    if (err) {
      throw err;
    } else {
      console.log("element updated");
    }
  });
}

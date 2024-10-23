import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "", // Add your MySQL password here
    database: "kidsingrow"
  });

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

export const dbPromise = db.promise();

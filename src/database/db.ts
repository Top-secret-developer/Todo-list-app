import { createConnection, Connection } from 'mysql2';
const mysql = require("mysql2)

export const db: Connection = createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'todo-app'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});



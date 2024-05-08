import { createConnection, Connection } from 'mysql';

export const db: Connection = createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Marvelous555#',
  database: 'Todo'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});



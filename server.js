import express from 'express';
import { createConnection } from 'mysql';
import cors from 'cors'


const app = express();

app.use(cors());

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Emc140999',
  database: 'crud_php_mysql',
  port: 3307
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

app.get('/tareas', (req, res) => {
  const query = 'SELECT * FROM tarea';

  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.listen(3001, () => {
  console.log('API RESTful corriendo en el puerto 3001');
});


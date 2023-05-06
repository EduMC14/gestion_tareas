import  express from 'express';
import cors from 'cors'
import { connection } from './db.js'


const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());


app.get('/tareas', (req, res) => {
  const query = 'SELECT * FROM task';

  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/saveTask',(req, res) => {
  const { titulo, descripcion,  fecha_a_entregar, status } = req.body;

  const query = "INSERT INTO task(titulo, descripcion, fecha_entregable, status) VALUES (?,?,?,?)";

  connection.query(query, [titulo, descripcion, fecha_a_entregar, status], function (error, results){
    if (error) throw error;

    res.status(200).json({message: 'El registro se guardo correctamente'})
  })
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});


app.listen(3001, () => {
  console.log('API RESTful corriendo en el puerto 3001');
});

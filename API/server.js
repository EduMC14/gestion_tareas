import  express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connection } from './db.js'


const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get('/fechas', (req,res) => {

  const query = `select distinct DATE(create_date) as fecha from task order by fecha desc`

  connection.query(query, (err, rows) => {
    if (err){
      res.status(500).json({error: err.message});
    } else {
      res.json(rows);
    }
  })
});

app.get('/tareas/:fecha', (req, res) => {

  const fecha = req.params.fecha
  const query = `SELECT DISTINCT * FROM task WHERE create_date LIKE '%${fecha}%'`;

  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
      console.log("Send tasks")
      console.log(rows)
    }
  });
});


app.post('/saveTask',(req, res) => {

  let { titulo, descripcion,  fecha_a_entregar, status } = req.body;
  

  const query = "INSERT INTO task(titulo, descripcion, fecha_a_entregar, status) VALUES (?,?,?,?)";
  connection.query(query, [titulo, descripcion, fecha_a_entregar, status], function (error, results){
    if (error){
      res.status(500).json({
        message: 'Hubo un error al guardar',
        error: error.message
      })
    }else {
      res.status(200).json({message: 'Registro guardado correctamente'})
    }
  })
});




app.put('/updateRegister/:id', (req, res) =>{

  let { titulo, descripcion,  fecha_a_entregar, status } = req.body;

  const id = req.params.id;

  const sql = `UPDATE task SET titulo = ?, descripcion = ?, fecha_a_entregar = ?, status = ? WHERE id = ?`;

  connection.query(sql, [titulo, descripcion, fecha_a_entregar, status, id], (err, result) => {
    if (err){
      res.status(500).json({
        message: 'Hubo un error al guardar' ,
        error: err.message
      })
    }else {
      res.status(200).json({message: `La fila con id ${id} ha sido actualizada.`})
    }
  });

});



app.delete('/deleteRow/:id', (req, res) => {


  const idAEliminar = req.params.id; // Obtener el ID del registro a eliminar desde los parámetros de la URL

  console.log(idAEliminar);
  // Definir la consulta SQL DELETE
  const sql = `DELETE FROM task WHERE id = ${idAEliminar}`;

  // Ejecutar la consulta y manejar errores
  connection.query(sql, function(err, result) {
    if (err) {
      res.status(500).send('Error al eliminar el registro');
      console.log(result)
    }else{
      res.status(200).send('Registro eliminado');
    }
  })
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});


app.listen(3001, () => {
  console.log('API RESTful corriendo en el puerto 3001');
});

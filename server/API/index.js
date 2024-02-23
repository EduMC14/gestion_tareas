/* eslint-disable camelcase */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { connection } from './db.js'
import routes from './endPoints.js'
import authToken from '../middleware/authToken.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/', routes)

app.get('/tareas/:fecha/:email', authToken, (req, res) => {
  const { fecha, email } = req.params
  console.log(email)
  const query = 'SELECT DISTINCT * FROM task WHERE create_date LIKE ? AND email = ?'

  connection.query(query, [`%${fecha}%`, email], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.json(rows)
      console.log('Send tasks')
      console.log(rows)
    }
  })
})

app.post('/saveTask', (req, res) => {
  const { fecha_de_inicio, titulo, descripcion, fecha_a_entregar, status, email } = req.body

  const query = 'INSERT INTO task(fecha_de_inicio, titulo, descripcion, fecha_a_entregar, status, email) VALUES (?,?,?,?,?,?)'
  connection.query(query, [fecha_de_inicio, titulo, descripcion, fecha_a_entregar, status, email], function (error, results) {
    if (error) {
      res.status(500).json({
        message: 'Hubo un error al guardar',
        error: error.message
      })
    } else {
      res.status(200).json({ message: 'Registro guardado correctamente' })
    }
  })
})

app.put('/updateRegister/:id', (req, res) => {
  const { titulo, descripcion, fecha_a_entregar, status } = req.body

  const id = req.params.id

  const sql = 'UPDATE task SET titulo = ?, descripcion = ?, fecha_a_entregar = ?, status = ? WHERE id = ?'

  connection.query(sql, [titulo, descripcion, fecha_a_entregar, status, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Hubo un error al guardar',
        error: err.message
      })
    } else {
      res.status(200).json({ message: `La fila con id ${id} ha sido actualizada.` })
    }
  })
})

app.delete('/deleteRow/:id', (req, res) => {
  const idAEliminar = req.params.id // Obtener el ID del registro a eliminar desde los parámetros de la URL

  console.log(idAEliminar)
  // Definir la consulta SQL DELETE
  const sql = `DELETE FROM task WHERE id = ${idAEliminar}`

  // Ejecutar la consulta y manejar errores
  connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).send('Error al eliminar el registro')
      console.log(result)
    } else {
      res.status(200).send('Registro eliminado')
    }
  })
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Algo salió mal!')
})

const PORT_API = process.env.PORT_API || 3001

app.listen(PORT_API, () => {
  console.log(`API RESTful corriendo en el puerto ${PORT_API}`)
})

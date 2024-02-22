import { connection } from '../API/db.js'

const fechas = (req, res) => {
  const email = req.params.email
  const query = 'select distinct DATE(create_date) as fecha from task where email = ? order by fecha desc'

  connection.query(query, [email], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.json(rows)
      console.log(rows)
    }
  })
}

export default fechas

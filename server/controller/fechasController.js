import { connection } from '../API/db.js'

const fechas = (req, res) => {
  const query = 'select distinct DATE(create_date) as fecha from task order by fecha desc'

  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.json(rows)
      console.log(rows)
    }
  })
}

export default fechas

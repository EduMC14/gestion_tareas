import { createConnection } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const db = createConnection({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.PASSWORD_DB,
  database: process.env.DB_NAME,
  port: process.env.PORT
})

db.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Conectado a la base de datos')
  }
})

export const connection = db

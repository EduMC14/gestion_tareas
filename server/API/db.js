import { createConnection } from 'mysql'

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Emc140999',
  database: 'crud_php_mysql',
  port: 3307
})

db.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Conectado a la base de datos')
  }
})

export const connection = db

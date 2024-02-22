import { connection } from '../API/db.js'
import bcrypt from 'bcrypt'

const usersModel = {
  userRegisted: (userRegister, callback) => {
    const { username, email } = userRegister

    const query = 'SELECT * FROM usuarios WHERE username = ? OR email = ?'
    try {
      connection.query(query, [username, email], (error, result) => {
        if (error) {
          callback(error, null)
        } else {
          callback(null, result)
        }
      })
    } catch (error) {
      console.log(error)
    }
  },

  userSave: (credencials, callback) => {
    const { username, email, password } = credencials
    const query = 'INSERT INTO usuarios(username, email, password) VALUES (?,?,?)'
    try {
      connection.query(query, [username, email, password], (error, result) => {
        if (error) {
          callback(error, null)
        } else {
          callback(null, result)
        }
      })
    } catch (err) {
      console.log(err)
    }
  },

  userLogin: (credecialsUser, callback) => {
    console.log(credecialsUser)
    const { email, password } = credecialsUser

    const query = 'SELECT * FROM usuarios WHERE email = ?'

    try {
      connection.query(query, [email], (error, result) => {
        console.log(result)
        if (error) {
          console.log('entre1')
          callback(error, null)
        } else {
          console.log('else')
          console.log(result.length)
          if (result.length === 0) {
            console.log('entre 2')
            const userNotFound = new Error('Usuario no encontrado')
            userNotFound.message = 'Usuario no encontrado'
            return callback(userNotFound, null)
          }
          const storedPassword = result[0].password
          console.log(password)
          console.log(storedPassword)

          bcrypt.compare(password, storedPassword, (compareError, ismatch) => {
            if (compareError) {
              // Si hay un error al comparar las contraseñas, llamar al callback con el error
              console.log('Error al comparar contraseñas:', compareError)
              return callback(compareError, null)
            } else {
              console.log(ismatch)
              if (ismatch) {
                // Si las contraseñas coinciden, el usuario ha proporcionado credenciales válidas
                console.log('match')
                return callback(null, { success: true, user: result[0] })
              } else {
                // Si las contraseñas no coinciden, devolver un error de credenciales inválidas
                const invalidCredentialsError = new Error('Credenciales Incorrectas')
                invalidCredentialsError.message = 'Credenciales Incorrectas'
                return callback(invalidCredentialsError, null)
              }
            }
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default usersModel

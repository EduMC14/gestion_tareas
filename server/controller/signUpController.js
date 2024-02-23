import usersModel from '../models/usersModel.js'
import bcrypt from 'bcrypt'

const userRegister = async (req, res) => {
  const { email, password, username } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    usersModel.userRegisted(req.body, (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).json({
          message: error
        })
      }
      let duplicateUsername = false
      let duplicateEmail = false

      if (result.length > 0) {
        result.forEach((row) => {
          if (row.username === username) {
            duplicateUsername = true
            return
          }
          if (row.email === email) {
            duplicateEmail = true
          }
        })
      }
      if (duplicateUsername) {
        console.log('usuerio ya existe')
        return res.status(400).json({
          message: 'Este nombre de usuario ya existe',
          status: 400
        })
      }
      if (duplicateEmail) {
        console.log('email ya existe')
        return res.status(400).json({
          message: 'Este email ya existe',
          status: 400
        })
      }

      usersModel.userSave({ username, email, password: hashedPassword }, (error, result) => {
        if (error) {
          console.log(error)
          console.log('envie esto')
          return res.status(500).json({
            message: 'Error interno del servidor'
          })
        } else {
          console.log('usuario creado')
          console.log(result)
          console.log('envie esto')
          return res.status(201).json({
            message: 'Usuario creado correctamente',
            status: 201
          })
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

export default userRegister

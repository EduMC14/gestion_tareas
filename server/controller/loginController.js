import usersModel from '../models/usersModel.js'
import jwt from 'jsonwebtoken'

const login = (req, res) => {

  usersModel.userLogin(req.body, (error, result) => {
    if (error) {
      res.send(error)
    }
    
    if (result.length > 0) {
      const {email, username} = result[0]
      console.log(email, username)
      const token = jwt.sign({ email, username }, 'emc', {
        expiresIn: '3m'
      })
      res.send({ token })
    } else {
      console.log('Usuario Equivocado')
      res.send({ message: 'Usuario Equivocado' })
    }
  })
}

export default login

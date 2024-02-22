import usersModel from '../models/usersModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const login = (req, res) => {
  usersModel.userLogin(req.body, (error, result) => {
    if (error) {
      return res.status(401).json({ message: error.message })
    }
    console.log(result.success)
    if (result.success) {
      console.log('Entre enviar token')
      const { email, username } = result.user
      console.log(email, username)
      const token = jwt.sign({ email, username }, process.env.SECRET_WORD, {
        expiresIn: '10m'
      })
      res.status(200).json({ token })
    }
  })
}

export default login

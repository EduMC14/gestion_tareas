import express from 'express'
import fechas from '../controller/fechasController.js'
import login from '../controller/loginController.js'
import userRegister from '../controller/signUpController.js'
const router = express.Router()

router.get('/fechas', fechas)

router.post('/login', login)

router.post('/registerUser', userRegister )

export default router

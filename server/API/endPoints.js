import express from 'express'
const  router  = express.Router();
import  fechas from '../controller/fechasController.js';
import login from '../controller/loginController.js';

router.get('/fechas', fechas)

router.post('/login', login)

export default router;
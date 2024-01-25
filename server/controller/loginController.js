import {connection} from '../API/db.js'
import jwt from 'jsonwebtoken'

const login = (req, res) => {
    const {email, password} = req.body

    const query = `SELECT * FROM usuarios WHERE email = ? AND password = ?`
    try {
        connection.query(query, [email, password], (error, result) => {
            if(error){
                res.send(error)
            }
            console.log(result.length)
            if(result.length > 0){
                const token = jwt.sign({email}, "Stack", {
                    expiresIn: '3m'
                });
                res.send({token});
            }else{
                console.log('Usuario Equivocado')
                res.send({message:'Usuario Equivocado'})
            }
        })
    } catch (error) {
    }
    

}

export default login;
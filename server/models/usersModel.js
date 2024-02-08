import {connection} from '../API/db.js'

const usersModel = {
    userRegisted: (userRegister, callback) =>{
        const {username, email} = userRegister;

    const query = `SELECT * FROM usuarios WHERE username = ? OR email = ?`;
    try {
        connection.query(query,[username, email], (error, result) => {
            if(error){
                callback(error, null);
            }else{
                callback(null,result);
            }
        })
    } catch (error) {
        console.log(error)
    }
    },

    userSave:(credencials, callback) => {
        const {username, email, password} = credencials;
        const query = 'INSERT INTO usuarios(username, email, password) VALUES (?,?,?)';
        try {
            connection.query(query,[username, email, password], (error, result) =>{
                if(error){
                    callback(error, null);
                }else{
                    callback(null, result);
                }
            })
        } catch (err) {
            console.log(err)
        }
    },

    userLogin: (credecialsUser, callback) => {
        const {email , password} = credecialsUser

        const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

        try {
            connection.query(query, [email, password], (error, result) => {
                if (error) {
                    callback(error, null)
                }else{
                    callback(null, result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default usersModel;
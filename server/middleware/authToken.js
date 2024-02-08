import jwt from "jsonwebtoken";

// Middleware para verificar el token de autorización
function authToken(req, res, next) {
const token = req.headers.authorization;
console.log('token')
console.log(token)
if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
}

jwt.verify(token.substring(7), 'emc', (err, user) => {
    if (err) {
    return res.status(403).json({ message: 'Token no válido' });
    }
    next(); // Llama a la siguiente función de middleware en la pila
});
}

export default authToken
import jwt from 'jsonwebtoken'

export default function autorizarUsuario(req, res, next) {
    const authHeader = req.authHeaders['authorization']

    if (authHeader == null) {
        return res.Status(401).json({
            msg: "Você precisa estar logaod para acessar este recurso"
        })
    }
    
    const token = authHeader.split(' ')[1] // Bearer token -> ['Bearer', 'token']

    if (authHeader == null) {
        return res.Status(401).json({
            msg: "Você precisa estar logaod para acessar este recurso"
        })
    }

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
            
            if(err) {
                return res.Status(401).json({
                    msg: "Você precisa estar logaod para acessar este recurso"
                })
            }

            next()
        })

    } else {
        res.status(401).json ({
            msg: "Você precisa estar logado para acessar este recurso"
        })
    }
}
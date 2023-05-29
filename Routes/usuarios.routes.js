import express from "express"
import multer from "multer"
import path from "path"
import * as usuarioController from '../Controllers/usuario.controller.js'
import autorizarAdmin from "../Middlewares/admin.middlewares.js"
import autorizarUsuario from "../Middlewares/auth.middlewares.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file))
    }
})

const router = express.Router()
const upload = multer({storage: storage})

//criação, atualização, remoção, retornar os usuários, retornar usuario por id

router.post('/', upload.single('fotoPerfil'), usuarioController.criarUsuario)
router.post('/login', usuarioController.login)

router.put('/:usuarioId', usuarioController.atualizarUsuario)

router.delete('/', usuarioController.deletarUsuario)

router.get('/', autorizarAdmin, usuarioController.getUsuarios)
router.get('/:usuarioId', usuarioController.getUsuarioPorId)

export default router
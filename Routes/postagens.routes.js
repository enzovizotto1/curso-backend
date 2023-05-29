import express from "express"
import * as postagensController from '../Controllers/postagem.controller.js'

const router = express.Router()

router.post('/', postagensController.criarPostagem)

router.put('/:postagensId', postagensController.atualizarPostagem)

router.get('/', postagensController.getPostagens)
router.get('/:postagensId', postagensController.getPostagens)

router.delete('/:postagensId', postagensController.deletarPostagem)


export default router
import express from "express"
import * as githubController from "../Controllers/github.controller.js"

const router = express.Router()

router.get('/:id/repositores', githubController.projetos)

export default router

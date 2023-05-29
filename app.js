import express from "express"
import helloRouter from "./Routes/hello.routes.js"
import categoriaRouter from "./Routes/categorias.routes.js"
import usuarioRouter from "./Routes/usuarios.routes.js"
import postagemRouter from "./Routes/postagens.routes.js"
import githubRouter from "./Routes/github.routes.js"
import axios from "axios"

const app = express()
const port = 3000

app.use(express.json())
app.use('/public', express.static('public'))

app.use("/", helloRouter)
app.use("/categorias", categoriaRouter)
app.use("/usuarios", usuarioRouter)
app.use("/postagens", postagemRouter)
app.use("/pessoas", githubRouter)


app.listen(port, () => {
  console.log(`A nossa API está rodando na porta ${port}`)
})

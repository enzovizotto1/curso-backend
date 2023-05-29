import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarPostagem = async (req, res) => {
    const postagem = await prisma.postagem.create({
        data: {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            usuario: {
                connect: {
                    id: req.body.usuario
                }
                }, 
            categorias: {
                connect: req.body.categorias
            }
        }

    })

    res.json({
        data: postagem,
        msg: "Postagem criada com sucesso"
    })
}

export const atualizarPostagem = async (req, res) => {
    const postagem = await prisma.postagem.update({
        where: {
            id: parseInt(req.params.postagemId)
        },
        data: {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            categorias: {
                connect: req.body.categorias
            }
        }
    })

    res.json({
        data: postagem,
        msg: "Postagem criada com sucesso"
    })
}

export const getPostagens = async (req, res) => {
    const postagens = await prisma.postagem.findMany({
        include: {
            categorias: true
        }
    })

    res.json({
        data: postagens,
        msg: "Postagens encontradas com sucesso"
    })
}

export const getPostagemPorId = async (req, res) => {
    const postagem = await prisma.postagem.findUnique({
        where: {
            id: req.params.postagemId
        },
        include: {
            categoria: true
        }
    })

    res.json({
        data: postagem,
        msg: "Postagem encontrada com sucesso"
    })
}

export const deletarPostagem = async (req, res) => {
    const postagemDeletada = await prisma.postagem.delete({
        where: {
            id: parseInt(req.params.postagemId)
        }
    })

    res.json({
        data: postagem,
        msg: "Postagem deletada com sucesso"
    })
}
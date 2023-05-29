import { PrismaClient } from "@prisma/client";
import gerarToken from "../Utils/jwt.js";

const prisma = new PrismaClient();

export const criarUsuario = async (req, res) => {

    const role = req.body.role == 'true' ? true : false // se role for igual a true, retorna true (?), se não (:), retorna falso

    const usuario = await prisma.usuario.create({
        data: {
            email: req.body.email,
            senha: req.body.senha,
            role: req.body.role,
            perfil: {
                create: {
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    nascimento: req.body.nascimento,
                    bio: req.body.bio,
                    fotoPerfil: req.file.path
                }
            }
        }
    })

    const token = gerarToken(usuario)

    res.json ({
        data: usuario,
        token: token,
        msg: "Usuário e perfil criados"
    })
}

export const login = async (req, res) => {
    const usuario = await prisma.usuario.findFirst({
        where: {
            AND: {
                email: req.body.email,
                senha: req.body.senha,
            }
        }
    })

    if(usuario == null) {
        res.Status(401).json({
            msg: "Email ou senha não conferem!"
        })
    }

    const token = gerarToken(usuario)

    res.json ({
        data: usuario,
        token: token,
        msg: "Logine efetuado com sucesso"
    })
    
}

export const atualizarUsuario = async (req, res) => {
    const usuario = await prisma.usuario.update({
        where: {
            id: parseInt(req.params.usuarioId)
        },
        data: {
            email: req.body.email,
            perfil: {
                update: {
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    nascimento: req.body.nascimento,
                    bio: req.body.bio
                }
            }
        }

    })

    res.json ({
        data: usuario,
        msg: "Usuário atualizado com sucesso"
    })

}


export const getUsuarios = async (req, res) => {
    const usuario = await prisma.usuario.findMany({
        where: {
            perfil: {
                nome: {
                    contains: req.query.nome

                },
                telefone: {
                    contains: req.query.telefone
                },
            },
        },

        include: {
            perfil: true
        }
    })

    res.json({
        data: usuario,
        msg: "Usuários encontrados com sucesso"
    })
}

export const getUsuarioPorId = async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: parseInt(req.params.usuarioId)
        },

        include: {
            perfil: true
        }
    })

    res.json({
        data: usuario,
        msg: "Usuário encontrados com sucesso"
    })
}

export const deletarUsuario = async (req, res) => {
    const perfilDeletado = await prisma.perfil.deleteMany({
        where: {
            usuario: {
                id: parseInt(req.params.usuarioId)
            }
        }
    })

    res.json({
        msg: "Usuário removido com sucesso"
    })
}
import axios from 'axios';


export const projetos = async (req, res) => {

        const { id } = req.params;
    
        // Fazer a requisição à API do GitHub
        const repositorios = await axios.get(`https://api.github.com/users/${id}/repos`);
    
        // Tratar a resposta da API e retornar para o cliente
        const infos = repositorios.data.map(repo => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          private: repo.private,
          
        })); 
    
        res.json({
            data: infos,
            msg: "Repositório do usuário encontrado com sucesso"
        })

        if (infos == null || undefined || []) {
            return res.status(401).json ({
                msg: "Repositório de usuário não encontrado"
            })
        }
     

};


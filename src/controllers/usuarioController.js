const { executarSQL } = require("../database");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function logar(dados){
    try {
        if(!dados.usuario_email || dados.usuario_email == ""){
            throw new Error("Campo email é obrigatório");
        }

        if(!dados.usuario_senha || dados.usuario_senha == ""){
            throw new Error("Campo senha é obrigatório");
        }

        const res = await executarSQL(`SELECT * FROM usuarios WHERE usuario_email = '${dados.usuario_email}';`);

        if(res.length > 0){
            const compare = await bcrypt.compare(dados.usuario_senha, res[0].usuario_senha);
            if(compare){
                const token = jwt.sign({ id: res.usuario_id }, process.env.SEGREDO, { expiresIn: '1h' });
                return { token };
            }else{
                return {
                    severity: 'warn',
                    detail: 'Email ou Senha incorretos'
                }
            }
        }else{
            return {
                severity: 'warn',
                detail: 'Email ou Senha incorretos'
            }
        }


    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

async function criar(dados){
    try {
        if(!dados.usuario_email || dados.usuario_email == ""){
            throw new Error("Campo email é obrigatório");
        }

        if(!dados.usuario_senha || dados.usuario_senha == ""){
            throw new Error("Campo senha é obrigatório");
        }

        let status = false;

        bcrypt.hash(dados.usuario_senha, 10, async (err, hash) => {
            if(err){
                return {
                    severity: 'warn',
                    detail: `Erro ao criar usuário: ${err.message}`
                }
            }

            const result = await executarSQL(`INSERT INTO usuarios (usuario_email, usuario_senha) VALUES ("${dados.usuario_email}", "${hash}");`);
    
            if(result.affectedRows == 0){
                return {
                    severity: 'warn',
                    detail: 'Ocorreu um erro'
                }
            }
            status = true;
        });

        if(status){
            return {
                severity: "success",
                detail: "Dados inseridos com sucesso!"
            }
        }

    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

module.exports = {
    logar,
    criar
}
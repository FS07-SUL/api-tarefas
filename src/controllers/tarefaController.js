const { executarSQL } = require("../database");

async function listarTarefas(){
    try {
        const result = await executarSQL(`SELECT * FROM tarefas;`);
        return result;
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

async function criar(dados){
    try {
        if(dados.tarefa_titulo == "" || !dados.tarefa_titulo){
            throw new Error("O campo tarefa_titulo é obrigatório!");
        }

        const result = executarSQL(`INSERT INTO tarefas (tarefa_titulo, tarefa_descricao) VALUES ('${dados.tarefa_titulo}','${dados.tarefa_descricao}')`);

        if(result.affected_rows == 0){
            return {
                severity: 'error',
                detail: 'Ocorreu um erro'
            }
        }

        return {
            severity: 'success',
            detail: 'Dados inseridos com sucesso!'
        };
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

async function editar(dados, id){

}

async function deletar(id){
    try {
        const result = await executarSQL(`DELETE FROM tarefas WHERE tarefa_id = ${id};`);
        return result;
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

module.exports = {
    listarTarefas,
    criar,
    editar,
    deletar
}
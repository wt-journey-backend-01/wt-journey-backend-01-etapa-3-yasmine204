const db = require('../db/db');
const { AppError } = require('../utils/errorHandler');

async function findAll({ agente_id, status } = {}) {
    try {
        const query = db('casos').select('*').orderBy('id', 'asc');

        if(agente_id) {
            query.where('agente_id', agente_id);
        }  
        
        if(status) {
            query.where('status', status);
        }

        return await query;
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao buscar casos.', [error.message]);
    }
}

async function findById(id) {
    try {
        return await db('casos').where({ id }).first();
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao buscar caso.', [error.message]);
    }
}

async function create(data) {
    try {
        const [caso] = await db('casos').insert(data).returning('*');
        return caso;
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao criar caso.', [error.message]);
    }
}

async function update(id, data) {
    try {
        const [caso] = await db('casos').where({ id }).update(data).returning('*'); 
        return caso || null;   
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao atualizar caso.', [error.message]);
    }
}

async function remove(id) {
    try {
        const deleted = await db('casos').where({ id }).del();
        return deleted > 0;
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao deletar caso.', [error.message]);
    }
}

async function search(q) {
    try {
        return await db('casos')
        .whereILike('titulo', `%${q}%`)
        .orWhereILike('descricao', `%${q}%`)
        .orderBy('id', 'asc');
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao buscar caso por palavra-chave.', [error.message]);
    }
} 

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    search
};
const db = require('../db/db');
const ApiError = require('../utils/ApiError');

async function findAll({ agente_id, status } = {}) {
    try {
        const query = db('casos').select('*');

        if(agente_id) {
            query.where('agente_id', Number(agente_id));
        }  
        
        if(status) {
            query.where('status', status);
        }

        return await query.orderBy('id', 'asc');
    } 
    catch (error) {
        throw new ApiError('Erro ao buscar casos.', 500);
    }
}

async function findById(id) {
    try { 
        const caso = await db('casos').where({ id }).first();
        
        if(!caso) {
            return null;
        }

        return caso;
    } 
    catch (error) {
        throw new ApiError('Erro ao buscar caso.', 500);
    }
}

async function create(data) {
    try {
        const [caso] = await db('casos').insert(data).returning('*');
        return caso;
    } 
    catch (error) {
        throw new ApiError('Erro ao criar caso.', 500);
    }
}

async function update(id, data) {
    try {
        const [caso] = await db('casos').update(data).where({ id }).returning('*'); 
        return caso || null;   
    } 
    catch (error) {
        throw new ApiError('Erro ao atualizar caso.', 500);
    }
}

async function remove(id) {
    try {
        const deleted = await db('casos').where({ id }).del();
        return deleted > 0;
    } 
    catch (error) {
        throw new ApiError('Erro ao deletar caso.', 500);
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
        throw new ApiError('Erro ao buscar caso por palavra-chave.', 500);
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
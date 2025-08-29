const db = require('../db/db');
const ApiError = require('../utils/ApiError');

async function findAll({ agente_id, status } = {}) {
    try {
        const query = db('casos').select('*').orderBy('id', 'asc');

        if(agente_id) {
            query.where('agente_id', agente_id);
        }  
        
        if(status) {
            query.where('status', 'ilike', status);
        }

        return await query;
    } 
    catch (error) {
        throw new ApiError('Erro ao buscar casos.', 500);
    }
}

async function findById(id) {
    try {
        return await db('casos').where({ id }).first();
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
        const [caso] = await db('casos').where({ id }).update(data).returning('*'); 
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

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
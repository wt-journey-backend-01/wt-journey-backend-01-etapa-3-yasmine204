const db = require('../db/db');
const { AppError } = require('../utils/errorHandler');

async function findAll({ cargo, sort } = {}) {
    try {
        const query = db('agentes').select('*');
        
        if(cargo) {
            query.where('cargo', cargo);
        }

        if(sort) {
            let direction = 'asc';

            if(sort.startsWith('-')) {
                direction = 'desc';
            }

            const column = sort.replace('-', '');

            if(column === 'dataDeIncorporacao') {
                query.orderBy(column, direction);
            }
        }
        else {
            query.orderBy('id', 'asc');
        }

        return await query;
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao buscar agentes.', [error.message]);
    }
}

async function findById(id) {
    try {
        return await db('agentes').where({ id }).first();
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao buscar agente.', [error.message]);
    }
}

async function create(data) {
    try {
        const [agente] = await db('agentes').insert(data).returning('*');
        return agente;
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao criar agente.', [error.message]);
    }
}

async function update(id, data) {
    try {
        const [agente] = await db('agentes').update(data).where({ id }).returning('*');
        return agente || null;
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao atualizar agente.', [error.message]);
    }
}

async function remove(id) {
    try {
        const deleted = await db('agentes').where({ id }).del();
        return deleted > 0;    
    } 
    catch (error) {
        throw new AppError(500, 'Erro ao deletar agente.', [error.message]);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
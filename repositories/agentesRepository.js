const db = require('../db/db');
const ApiError = require('../utils/ApiError');

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
            query.orderBy(column, direction);
            
        }
        else {
            query.orderBy('id', 'asc');
        }

        const agentes = await query;
        return agentes.map(a => ({
            ...a,
            dataDeIncorporacao: a.dataDeIncorporacao
            ? new Date(a.dataDeIncorporacao).toISOString().split('T')[0]
            : null
        }));
    } 
    catch (error) {
        throw new ApiError('Erro ao buscar agentes.', 500);
    }
}

async function findById(id) {
    try {
        const agente = await db('agentes').where({ id }).first();
        
        if(!agente) {
            return null;
        }

        agente.dataDeIncorporacao = agente.dataDeIncorporacao
            ? new Date(agente.dataDeIncorporacao).toISOString().split('T')[0]
            : null

        return agente;
    } 
    catch (error) {
        throw new ApiError('Erro ao buscar agente.', 500)
    }
}

async function create(data) {
    try {
        const [agente] = await db('agentes').insert(data).returning('*');

        agente.dataDeIncorporacao = agente.dataDeIncorporacao
            ? new Date(agente.dataDeIncorporacao).toISOString().split('T')[0]
            : null

        return agente;
    } 
    catch (error) {
        throw new ApiError('Erro ao criar agente.', 500)
    }
}

async function update(id, data) {
    try {
        const [agente] = await db('agentes').update(data).where({ id }).returning('*');

        if(!agente) {
            return null;
        }
        
        agente.dataDeIncorporacao = agente.dataDeIncorporacao
            ? new Date(agente.dataDeIncorporacao).toISOString().split('T')[0]
            : null

        return agente;
    } 
    catch (error) {
        throw new ApiError('Erro ao atualizar agente.', 500)
    }
}

async function remove(id) {
    try {
        const deleted = await db('agentes').where({ id }).del();
        return deleted > 0;    
    } 
    catch (error) {
        throw new ApiError('Erro ao deletar agente.', 500)
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
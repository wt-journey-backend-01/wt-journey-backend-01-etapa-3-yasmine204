const repository = require('../repositories/agentesRepository');
const { agentesSchema } = require('../utils/agentesValidation');
const { AppError } = require('../utils/errorHandler');

const getAgentes = async (req, res, next) => {
    try {
        const { cargo, sort } = req.query;

        const agentes = await repository.findAll({ cargo, sort });

        res.status(200).json(agentes);
    } 
    catch (error) {
        next(error);
    }
};

const getAgenteById = async (req, res, next) => {
    try {
        const { id } = req.params; 
        
        const agente = await repository.findById(id);

        if(!agente) {
            throw new AppError(404, 'Agente não encontrado.');
        }

        res.status(200).json(agente);
    } 
    catch (error) {
        next(error);
    }
};

const createAgente = async (req, res, next) => {
    try {
        const {nome, dataDeIncorporacao, cargo} = req.body;  

        const dataReceived = {
            nome,
            dataDeIncorporacao,
            cargo
        };

        const data = agentesSchema.parse(dataReceived);
        const newAgente = await repository.create(data);

        res.status(201).json(newAgente);

    } 
    catch (error) {
        next(error);
    }
};

const updateCompletelyAgente = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = agentesSchema.parse(req.body);
        const updated = await repository.update(id, data);

        if(!updated) {
            throw new AppError(404, 'Agente não encontrado.');
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        next(error);
    }
};

const partiallyUpdateAgente = async (req, res, next) => {
    try {
        const { id } = req.params;

        const partiallyData = agentesSchema.partial().parse(req.body);
        const updated = await repository.update(id, partiallyData);

        if (!updated) {
            throw new AppError(404, 'Agente não encontrado.');
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        next(error);
    }
};

const deleteAgente = async (req, res, next) => {
    try {
            const { id } = req.params;
    
            const deleted = await repository.remove(id);
    
            if (!deleted) {
                throw new AppError(404, 'Agente não encontrado.');
            }
    
            res.status(204).send();
        } 
        catch (error) {
            next(error);
        }
};
 
module.exports = {
    getAgentes,
    getAgenteById,
    createAgente,
    updateCompletelyAgente,
    partiallyUpdateAgente,
    deleteAgente
};
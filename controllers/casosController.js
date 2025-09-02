const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { casosSchema } = require('../utils/casosValidation');
const { AppError } = require('../utils/errorHandler');

const getCasos = async (req, res, next) => {
    try {
        const { agente_id, status } = req.query;

        const casos = await casosRepository.findAll({ agente_id, status });

        res.status(200).json(casos);
    }
    catch(error) {
        next(error);
    }
}; 

const getCasoById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const caso = await casosRepository.findById(id);

        if(!caso) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        res.status(200).json(caso);
    } 
    catch (error) {
        next(error);
    }
};

const createCaso = async (req, res, next) => {
    try {
        const { titulo, descricao, status, agente_id } = req.body;

        const agenteExists = await agentesRepository.findById(agente_id);
        
        if(!agenteExists) {
            throw new AppError(404, 'Agente não encontrado.');
        }

        const dataReceived = {
            titulo,
            descricao,
            status, 
            agente_id
        };

        const data = casosSchema.parse(dataReceived);
        const newCaso = await casosRepository.create(data);

        res.status(201).json(newCaso);
    } 
    catch (error) {
        next(error);
    }
};

const updateCompletelyCaso = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = casosSchema.parse(req.body);

        const agenteExists = await agentesRepository.findById(data.agente_id);
        
        if(!agenteExists) {
            throw new AppError(404, 'Agente não encontrado.');
        }

        const updated = await casosRepository.update(id, data);
        
        if (!updated) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        next(error);
    }
};

const partiallyUpdateCaso = async (req, res, next) => {
    try {
        const { id } = req.params;

        const partiallyData = casosSchema.partial().parse(req.body);

        if('agente_id' in partiallyData) {
            const agenteExists = await agentesRepository.findById(partiallyData.agente_id);
    
            if(!agenteExists) {
                throw new AppError(404, 'Agente não encontrado.');
            }
        }

        const updated = await casosRepository.update(id, partiallyData);

        if (!updated) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        next(error);
    }
};

const deleteCaso = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await casosRepository.remove(id);

        if (!deleted) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        res.status(204).send();
    } 
    catch (error) {
        next(error);
    }
};

const getAgenteByCasoId = async (req, res, next) => {
    try {
        const { caso_id } = req.params;

        const caso = await casosRepository.findById(caso_id);
        
        if(!caso) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        const agente = await agentesRepository.findById(caso.agente_id);
        
        if(!agente) {
            throw new AppError(404, 'Agente não encontrado.');
        }

        res.status(200).json(agente);
    } 
    catch (error) {
        next(error);  
    }
};

const searchCasos = async (req, res, next) => {
    try {
        const { q } = req.query;

        const casos = await casosRepository.search(q);

        res.status(200).json(casos);
    }
    catch (error) {
        next(error);
    }
}; 

module.exports = {
    getCasos,
    getCasoById,
    createCaso,
    updateCompletelyCaso,
    partiallyUpdateCaso,
    deleteCaso,
    getAgenteByCasoId,
    searchCasos
}
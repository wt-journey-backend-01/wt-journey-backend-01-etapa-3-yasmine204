const repository = require('../repositories/agentesRepository');
const { agentesSchema } = require('../utils/agentesValidation');
const ApiError = require('../utils/ApiError');
const formatZodError = require('../utils/formatZodError');

const getAgentes = async (req, res, next) => {
    try {
        const { cargo, sort } = req.query;

        const agentes = await repository.findAll({ cargo, sort });

        res.status(200).json(agentes);
    } 
    catch (error) {
        return next(new ApiError(error.message, 400));
    }
};

const getAgenteById = async (req, res, next) => {
    try {
        const { id } = req.params; 
        
        const agente = await repository.findById(id);
        
        if(!agente) {
            return next(new ApiError('Agente não encontrado.', 404));
        }

        res.status(200).json(agente);
    } 
    catch (error) {
        return next(new ApiError(error.message, 400));
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
        if(formatZodError(error, next)) return;

        return next(new ApiError(error.message));
    }
};

const updateCompletelyAgente = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = agentesSchema.parse(req.body);
        const updated = await repository.update(id, data);

        if(!updated) {
            return next(new ApiError('Agente não encontrado', 404));
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        if(formatZodError(error, next)) return;

        return next(new ApiError(error.message));
    }
};

const partiallyUpdateAgente = async (req, res, next) => {
    try {
        const { id } = req.params;

        const partiallyData = agentesSchema.partial().parse(req.body);
        const updated = await repository.update(id, partiallyData);

        if (!updated) {
            return next(new ApiError('Agente não encontrado.', 404));
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        if(formatZodError(error, next)) return;

        return next(new ApiError(error.message));
    }
};

const deleteAgente = async (req, res, next) => {
    try {
            const { id } = req.params;
    
            const deleted = await repository.remove(id);
    
            if (!deleted) {
                return next(new ApiError('Agente não encontrado.', 404));
            }
    
            res.status(204).send();
        } 
        catch (error) {
            return next(new ApiError(error.message, 400));
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
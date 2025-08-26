const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { casosSchema } = require('../utils/casosValidation');
const ApiError = require('../utils/ApiError');
const formatZodError = require('../utils/formatZodError');
const normalizeText = require('../utils/normalizeText');

const getCasos = async (req, res, next) => {
    try {
        let casos = await casosRepository.findAll();
        const { agente_id, status } = req.query;
       
        if(agente_id) {
            casos = casos.filter((caso) => caso.agente_id === Number(agente_id));
        }

        if(status) {
            casos = casos.filter((caso) => caso.status.toLowerCase() === status.toLowerCase());
        }

        res.status(200).json(casos);
    }
    catch(error) {
        return next(new ApiError(error.message, 400));
    }
}; 

const getCasoById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const caso = await casosRepository.findById(id);

        if(!caso) {
            return next(new ApiError('Caso não encontrado.', 404));
        }

        res.status(200).json(caso);
    } 
    catch (error) {
        return next(new ApiError(error.message, 400));
    }
};

const createCaso = async (req, res, next) => {
    try {
        const { titulo, descricao, status, agente_id } = req.body;

        const agenteExists = await agentesRepository.findById(agente_id);
        if(!agenteExists) {
            return next(new ApiError('Agente não encontrado.', 404))
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
        if(formatZodError(error, next)) return;

        return next(new ApiError(error.message));
    }
};

const updateCompletelyCaso = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = casosSchema.parse(req.body);

        const agenteExists = await agentesRepository.findById(data.agente_id);
        if(!agenteExists) {
            return next(new ApiError('Agente não encontrado.', 404));
        }

        const updated = await casosRepository.update(id, data);

        if (!updated) {
            return next(new ApiError('Caso não encontrado.', 404));
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        if(formatZodError(error, next)) return;

        return next(new ApiError(error.message));
    }
};

const partiallyUpdateCaso = async (req, res, next) => {
    try {
        const { id } = req.params;

        const partiallyData = casosSchema.partial().parse(req.body);

        if('agente_id' in partiallyData) {
            const agenteExists = await agentesRepository.findById(partiallyData.agente_id);
            
            if(!agenteExists) {
                return next(new ApiError('Agente não encontrado.', 404))
            }
        }

        const updated = await casosRepository.update(id, partiallyData);

        if (!updated) {
            return next(new ApiError('Caso não encontrado.', 404));
        }

        res.status(200).json(updated);
    } 
    catch (error) {
        if(formatZodError(error, next)) return;

        return next(new ApiError(error.message));
    }
};

const deleteCaso = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await casosRepository.remove(id);

        if (!deleted) {
            return next(new ApiError('Caso não encontrado.', 404));
        }

        res.status(204).send();
    } 
    catch (error) {
        return next(new ApiError(error.message, 400));
    }
};

const getAgenteByCasoId = async (req, res, next) => {
    try {
        const { caso_id } = req.params;

        const caso = await casosRepository.findById(caso_id);
        if(!caso) {
            return next(new ApiError('Caso não encontrado.', 404));
        }

        const agente = await agentesRepository.findById(caso.agente_id);
        if(!agente) {
            return next(new ApiError('Agente não encontrado.', 404));
        }

        res.status(200).json(agente);
    } 
    catch (error) {
        return next(new ApiError(error.message, 400));    
    }
};

const searchCasos = async (req, res, next) => {
    try {
        const { q } = req.query;

        if(!q || q.trim() === '') {
            return next(new ApiError('Parâmetro de busca q é obrigatório.', 400));
        }

        const term = normalizeText(q);
        let casos = await casosRepository.findAll();

        casos = casos.filter((caso) => {
            const titulo = normalizeText(caso.titulo);
            const descricao = normalizeText(caso.descricao);

            return titulo.includes(term) || descricao.includes(term);
        });

        res.status(200).json(casos);
    }
    catch (error) {
        return next(new ApiError(error.message, 400));
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
const { ZodError } = require('zod');
const ApiError = require('./ApiError');

function formatZodError (error, next) {
    if(error instanceof ZodError && Array.isArray(error.issues)) {
        const formattedErrors = {};

        error.issues.forEach(e => {
            const field = e.path.join('.') || 'unknown';
            
            if (e.code === 'invalid_type') {
                formattedErrors[field] = `O campo '${field}' é obrigatório.`;
            } 
            else {
                formattedErrors[field] = e.message;
            }
        });

        next(new ApiError('Parâmetros inválidos', 400, formattedErrors));
        return true;
    }

    return false;
}

module.exports = formatZodError;
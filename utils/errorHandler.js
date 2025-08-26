const ApiError = require('./ApiError');

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            errors: Array.isArray(err.errors) ? err.errors : [],
        });
    }
    
    res.status(500).json({
        status: 500,
        message: 'Erro interno do servidor',
        errors: [],
    });
}

module.exports = errorHandler;
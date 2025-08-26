const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API para o Departamento de Polícia',
            version: '1.0.0',
            description:
                'API para gerenciamento de casos e agentes em um sistema investigativo. Esta API segue o padrão REST e a arquitetura MVC, utilizando arrays para armazenamento temporário de dados.',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Servidor local de desenvolvimento',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
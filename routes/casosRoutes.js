const express = require('express');
const router = express.Router();
const controller = require('../controllers/casosController');

/**
 * @swagger
 * tags:
 *      name: Casos
 *      description: Gerenciamento dos casos do Departamento de Polícia
 */

/**
 * @swagger
 * /casos:
 *  get: 
 *      summary: Lista todos os casos
 *      tags: [Casos]
 *      responses:
 *          200:
 *              description: Lista de casos 
 */
router.get('/', controller.getCasos);

/**
 * @swagger
 * /casos:
 *  post: 
 *      summary: Cria um novo caso
 *      tags: [Casos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [titulo, descricao, status, agente_id]
 *                      properties: 
 *                          titulo: 
 *                              type: string
 *                          descricao: 
 *                              type: string
 *                          status: 
 *                              type: string
 *                              enum: [aberto, solucionado]
 *                          agente_id: 
 *                              type: string
 *      responses:
 *          201:
 *              description: Caso criado com sucesso 
 */
router.post('/', controller.createCaso);

/**
 * @swagger
 * /casos/search:
 *  get:
 *      summary: Busca casos pelo termo no título ou descrição (full-text search)
 *      tags: [Casos]
 *      parameters:
 *          - in: query
 *            name: q
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Lista de casos que contêm o termo no título ou descrição
 */
router.get('/search', controller.searchCasos);

/**
 * @swagger
 * /casos/{caso_id}/agente:
 *  get:
 *      summary: Busca um agente pelo id do caso
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: caso_id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Agente encontrado com sucesso
 */
router.get('/:caso_id/agente', controller.getAgenteByCasoId);

/**
 * @swagger
 * /casos/{id}:
 *  get:
 *      summary: Busca um caso pelo id
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Caso encontrado com sucesso
 */
router.get('/:id', controller.getCasoById);

/**
 * @swagger
 * /casos/{id}:
 *  put: 
 *      summary: Atualiza completamente um caso
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [titulo, descricao, status, agente_id]
 *                      properties: 
 *                          titulo: 
 *                              type: string
 *                          descricao: 
 *                              type: string
 *                          status: 
 *                              type: string
 *                              enum: [aberto, solucionado]
 *                          agente_id: 
 *                              type: string
 *      responses:
 *          200:
 *              description: Caso atualizado com sucesso 
 */
router.put('/:id', controller.updateCompletelyCaso);

/**
 * @swagger
 * /casos/{id}:
 *  patch: 
 *      summary: Atualiza parcialmente um caso
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          titulo: 
 *                              type: string
 *                          descricao: 
 *                              type: string
 *                          status: 
 *                              type: string
 *                              enum: [aberto, solucionado]
 *                          agente_id: 
 *                              type: string
 *      responses:
 *          200:
 *              description: Caso atualizado parcialmente com sucesso 
 */
router.patch('/:id', controller.partiallyUpdateCaso);

/**
 * @swagger
 * /casos/{id}:
 *  delete:
 *      summary: Remove um caso pelo id
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          204:
 *              description: Caso deletado com sucesso
 */
router.delete('/:id', controller.deleteCaso);



module.exports = router;
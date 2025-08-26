const { z } = require('zod');

const casosSchema = z.object({
    titulo: z.string({ required_error: "O campo 'título' é obrigatório." }).min(1, "O campo 'título' não pode estar vazio."),
    
    descricao: z.string({ required_error: "O campo 'descrição' é obrigatório." }).min(1, "O campo 'descrição' não pode estar vazio."),
    
    status: z
    .string({ required_error: "O campo 'título' é obrigatório." })
    .refine((val) => ['aberto', 'solucionado'].includes(val), {
        message: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'."
    }),

    agente_id: z
    .string({ required_error: "O campo 'agente_id' é obrigatório." })
}).strict();

module.exports = { casosSchema };                                                                                                                                                                                                                                                                         
const { z } = require('zod');

const agentesSchema = z.object({
    nome: z.string({ required_error: "O campo 'nome' é obrigatório." }).min(1, "O campo 'nome' não pode estar vazio."),
    
    dataDeIncorporacao: z
    .string({ required_error: "O campo 'dataDeIncorporacao' é obrigatório."  })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'")
    .refine((dateStr) => {
        const date = new Date(dateStr);
        
        if(Number.isNaN(date.getTime())) return false;

        const today = new Date;
        today.setHours(0, 0, 0, 0);

        return date <= today;
    }, {
        message: "O campo 'dataDeIncorporacao' não pode conter data inválida ou futura."
    }),
    
    cargo: z.string({ required_error: "O campo 'cargo' é obrigatório." }).min(1, "O campo 'cargo' não pode estar vazio.")
}).strict();

module.exports = { agentesSchema };
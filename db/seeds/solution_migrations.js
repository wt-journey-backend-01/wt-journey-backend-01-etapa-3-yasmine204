/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('casos').del();
  await knex('agentes').del();

  const agentesIds = await knex('agentes').insert([
    { nome: 'Rommel Carneiro', dataDeIncorporacao: '1992-10-04', cargo: 'Delegado' },
    { nome: 'Ana Beatriz Souza', dataDeIncorporacao: '2005-03-15', cargo: 'Inspetor' }
  ]).returning('id');

  await knex('casos').insert([
    { titulo: 'Homicídio', 
      descricao: 'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.', 
      status: 'aberto',
      agente_id: agentesIds[0].id
    },
    { titulo: 'Roubo a banco', 
      descricao: 'Assalto registrado às 14:20 do dia 21/08/2020 em agência bancária do centro, com reféns e violência.', 
      status: 'aberto',
      agente_id: agentesIds[1].id
    }
    ]);
};
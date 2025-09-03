/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('casos').del();

  const agentes = await knex('agentes').orderBy('id', 'asc');

  await knex('casos').insert([
    { 
      titulo: 'Homicídio',
      descricao: 'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
      status: 'aberto',
      agente_id: agentes[0].id
    },
    { 
      titulo: 'Roubo a banco',
      descricao: 'Assalto registrado às 14:20 do dia 21/08/2020 em agência bancária do centro, com reféns e violência.',
      status: 'aberto',
      agente_id: agentes[1].id 
    }
  ]);
};

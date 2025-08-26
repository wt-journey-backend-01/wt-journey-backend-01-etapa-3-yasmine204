/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('agentes').del();

  await knex('agentes').insert([
    { nome: 'Rommel Carneiro', dataDeIncorporacao: '1992-10-04', cargo: 'Delegado' },
    { nome: 'Ana Beatriz Souza', dataDeIncorporacao: '2005-03-15', cargo: 'Inspetor' }
  ]);
};

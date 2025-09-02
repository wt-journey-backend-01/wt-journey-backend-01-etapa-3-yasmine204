/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('agentes', (table) => {
            table.increments('id');
            table.string('nome');
            table.date('dataDeIncorporacao');
            table.string('cargo');
        })
        .createTable('casos', table => {
            table.increments('id');
            table.string('titulo');
            table.text('descricao');
            table.enu('status', ['aberto', 'solucionado']);
            table.integer('agente_id')
                .unsigned()
                .references('id')
                .inTable('agentes')
                .onDelete('CASCADE');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('casos')
        .dropTableIfExists('agentes');
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('votes', function(table) {
            table.increments('id').primary();  // Auto-incrementing ID
            table.integer('option_id').unsigned().notNullable().references('id').inTable('options').onDelete('CASCADE');
            table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('votes');
};

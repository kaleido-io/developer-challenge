/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('polls', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('question').notNullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL');
            table.timestamps(true, true);
        })
        .then(function() {
            return knex.schema.createTable('options', function(table) {
                table.increments('id').primary();
                table.string('text').notNullable();
                table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL');
                table.integer('poll_id').unsigned().notNullable().references('id').inTable('polls').onDelete('CASCADE');
            });
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('options')
        .then(function() {
            return knex.schema.dropTableIfExists('polls');
        });
};

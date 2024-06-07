/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pollEvents', function(table) {
        table.increments('id').primary();
        table.string('poll_id').notNullable();
        table.string('question').notNullable();
        table.string('creator_hash').notNullable();
        table.string('creator_address').notNullable();
        table.string('transaction_hash').notNullable();
        table.integer('block_number').notNullable();
        table.integer('log_index').notNullable();
        table.timestamp('timestamp').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .then(function() {
        return knex.schema.createTable('voteEvents', function(table) {
            table.increments('id').primary();
            table.integer('poll_id').notNullable();
            table.integer('vote_id').notNullable();
            table.string('option_id').notNullable();
            table.string('voter_hash').notNullable();
            table.string('voter_address').notNullable();
            table.string('transaction_hash').notNullable();
            table.integer('block_number').notNullable();
            table.integer('log_index').notNullable();
            table.timestamp('timestamp').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('pollEvents')
        .then(function() {
            return knex.schema.dropTableIfExists('voteEvents');
        });
};

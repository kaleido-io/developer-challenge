/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pollEvents', function(table) {
        table.increments('id').primary();
        table.string('pollId').notNullable();
        table.string('question').notNullable();
        table.string('creatorHash').notNullable();
        table.string('creatorAddress').notNullable();
        table.string('transactionHash').notNullable();
        table.integer('blockNumber').notNullable();
        table.integer('logIndex').notNullable();
        table.timestamp('timestamp').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .then(function() {
        return knex.schema.createTable('voteEvents', function(table) {
            table.increments('id').primary();
            table.integer('pollId').notNullable();
            table.integer('voteId').notNullable();
            table.string('optionId').notNullable();
            table.string('voterHash').notNullable();
            table.string('voterAddress').notNullable();
            table.string('transactionHash').notNullable();
            table.integer('blockNumber').notNullable();
            table.integer('logIndex').notNullable();
            table.timestamp('timestamp').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
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

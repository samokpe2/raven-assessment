/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('accounts', function (table) {
      table.increments('id');
      table.string('account_number', 255).notNullable();
      table.string('account_name', 255);
      table.string('bank', 255);
      table.smallint('isPermanent');
      table.string('amount');
      table.integer('user_id',255);
      table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('accounts');
};

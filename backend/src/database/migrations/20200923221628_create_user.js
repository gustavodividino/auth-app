exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
       table.string('email').primary();
       table.string('name').notNullable();
       table.string('password').notNullable();
   
     })
   };
   
   exports.down = function(knex) {
     return knex.schema.dropTable('user');
   };
  
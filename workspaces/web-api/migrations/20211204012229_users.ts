import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");

    table.string("name", 255).notNullable();

    table.string("email", 255).notNullable().unique();

    table.string("pw_hash", 255).notNullable();

    table
      .timestamp("created_utc", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table
      .timestamp("updated_utc", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.boolean("is_active").notNullable().defaultTo(true);
  });
}

export async function down(): Promise<void> {
  return new Promise((resolve) => resolve());
}

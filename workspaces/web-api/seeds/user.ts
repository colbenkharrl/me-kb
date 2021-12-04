import { Knex } from "knex";
import bcrypt from "bcryptjs";

export const seed = (knex: Knex): Promise<void> => {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          name: "Testy McTesterson",
          email: "test@me-kb.com",
          pw_hash: bcrypt.hashSync("test12345"),
          created_utc: Date.now(),
          updated_utc: Date.now(),
          is_active: true,
        },
      ]);
    });
};

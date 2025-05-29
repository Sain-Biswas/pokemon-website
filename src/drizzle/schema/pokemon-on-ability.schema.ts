import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { pokemonSchema } from "./pokemon.schema";
import { abilitySchema } from "./ability.schema";
import { relations } from "drizzle-orm";

export const pokemonOnAbilitySchema = sqliteTable(
  "POKEMON_ON_ABILITY",
  {
    pokemonReference: text("POKEMON_REFERENCE").references(
      () => pokemonSchema.id
    ),
    abilityReference: text("ABILITY_REFERENCE").references(
      () => abilitySchema.id
    ),
    isHidden: integer("IS_HIDDEN", { mode: "boolean" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.abilityReference, t.pokemonReference, t.isHidden],
    }),
  })
);

export const pokemonOnAbilityRelations = relations(
  pokemonOnAbilitySchema,
  ({ one }) => ({
    pokemon: one(pokemonSchema, {
      fields: [pokemonOnAbilitySchema.pokemonReference],
      references: [pokemonSchema.id],
    }),
    ability: one(abilitySchema, {
      fields: [pokemonOnAbilitySchema.abilityReference],
      references: [abilitySchema.id],
    }),
  })
);


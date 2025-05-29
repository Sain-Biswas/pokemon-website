import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { pokemonSpeciesSchema } from "./pokemon-species.schema";
import { pokemonSchema } from "./pokemon.schema";
import { relations } from "drizzle-orm";

export const pokemonSpeciesOnVarietySchema = sqliteTable(
  "POKEMON_SPECIES_ON_VARIETY",
  {
    pokemonSpeciesReference: text("POKEMON_SPECIES_REFERENCE").references(
      () => pokemonSpeciesSchema.id
    ),
    pokemonReference: text("POKEMON_REFERENCE").references(
      () => pokemonSchema.id
    ),
    isDefault: integer("IS_DEFAULT", { mode: "boolean" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.pokemonReference, t.pokemonSpeciesReference],
    }),
  })
);

export const pokemonSpeciesOnVarietyRelations = relations(
  pokemonSpeciesOnVarietySchema,
  ({ one }) => ({
    pokemonSpecies: one(pokemonSpeciesSchema, {
      fields: [pokemonSpeciesOnVarietySchema.pokemonSpeciesReference],
      references: [pokemonSpeciesSchema.id],
    }),
    pokemon: one(pokemonSchema, {
      fields: [pokemonSpeciesOnVarietySchema.pokemonReference],
      references: [pokemonSchema.id],
    }),
  })
);


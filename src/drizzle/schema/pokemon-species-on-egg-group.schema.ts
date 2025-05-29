import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pokemonSpeciesSchema } from "./pokemon-species.schema";
import { eggGroupSchema } from "./egg-group.schema";
import { relations } from "drizzle-orm";

export const pokemonSpeciesOnEggGroupSchema = sqliteTable(
  "POKEMON_SPECIES_ON_EGG_GROUP",
  {
    pokemonReference: text("POKEMON_REFERENCE").references(
      () => pokemonSpeciesSchema.id
    ),
    eggGroupReference: text("EGG_GROUP_REFERENCE").references(
      () => eggGroupSchema.id
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eggGroupReference, t.pokemonReference] }),
  })
);

export const pokemonSpeciesOnEggGroupRelations = relations(
  pokemonSpeciesOnEggGroupSchema,
  ({ one }) => ({
    pokemonSpecies: one(pokemonSpeciesSchema, {
      fields: [pokemonSpeciesOnEggGroupSchema.pokemonReference],
      references: [pokemonSpeciesSchema.id],
    }),
    eggGroup: one(eggGroupSchema, {
      fields: [pokemonSpeciesOnEggGroupSchema.eggGroupReference],
      references: [eggGroupSchema.id],
    }),
  })
);


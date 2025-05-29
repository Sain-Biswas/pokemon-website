import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pokemonSpeciesSchema } from "./pokemon-species.schema";
import { versionSchema } from "./version.schema";
import { relations } from "drizzle-orm";

export const pokemonSpeciesOnFlavorTextSchema = sqliteTable(
  "POKEMON_SPECIES_ON_FLAVOR_TEXT",
  {
    pokemonSpeciesReference: text("POKEMON_SPECIES_REFERENCE").references(
      () => pokemonSpeciesSchema.id
    ),
    versionReference: text("VERSION_REFERENCE").references(
      () => versionSchema.id
    ),
    flavorText: text("FLAVOR_TEXT"),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.pokemonSpeciesReference, t.versionReference],
    }),
  })
);

export const pokemonSpeciesOnFlavorTextRelations = relations(
  pokemonSpeciesOnFlavorTextSchema,
  ({ one }) => ({
    pokemonSpecies: one(pokemonSpeciesSchema, {
      fields: [pokemonSpeciesOnFlavorTextSchema.pokemonSpeciesReference],
      references: [pokemonSpeciesSchema.id],
    }),
    version: one(versionSchema, {
      fields: [pokemonSpeciesOnFlavorTextSchema.versionReference],
      references: [versionSchema.id],
    }),
  })
);


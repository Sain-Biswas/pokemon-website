import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { typeSchema } from "./type.schema";
import { pokemonSchema } from "./pokemon.schema";
import { relations } from "drizzle-orm";

export const typeOnPokemonSchema = sqliteTable(
  "TYPE_ON_POKEMON",
  {
    typeReference: text("TYPE_REFERENCE").references(() => typeSchema.id),
    pokemonReference: text("POKEMON_REFERENCE").references(
      () => pokemonSchema.id,
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.pokemonReference, t.typeReference] }),
  }),
);

export const typeOnPokemonRelations = relations(
  typeOnPokemonSchema,
  ({ one }) => ({
    type: one(typeSchema, {
      fields: [typeOnPokemonSchema.typeReference],
      references: [typeSchema.id],
    }),
    pokemon: one(pokemonSchema, {
      fields: [typeOnPokemonSchema.pokemonReference],
      references: [pokemonSchema.id],
    }),
  }),
);

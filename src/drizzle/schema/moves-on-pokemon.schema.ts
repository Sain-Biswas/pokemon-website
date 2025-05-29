import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { movesSchema } from "./moves.schema";
import { pokemonSchema } from "./pokemon.schema";
import { relations } from "drizzle-orm";

export const movesOnPokemonSchema = sqliteTable(
  "MOVES_ON_POKEMON",
  {
    moveReference: text("MOVE_REFERENCE").references(() => movesSchema.id),
    pokemonReference: text("POKEMON_REFERENCE").references(
      () => pokemonSchema.id
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.moveReference, t.pokemonReference] }),
  })
);

export const movesOnPokemonRelations = relations(
  movesOnPokemonSchema,
  ({ one }) => ({
    move: one(movesSchema, {
      fields: [movesOnPokemonSchema.moveReference],
      references: [movesSchema.id],
    }),
    pokemon: one(pokemonSchema, {
      fields: [movesOnPokemonSchema.pokemonReference],
      references: [pokemonSchema.id],
    }),
  })
);


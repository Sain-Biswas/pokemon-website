import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pokemonSpeciesSchema } from "./pokemon-species.schema";
import { relations } from "drizzle-orm";
import { typeOnPokemonSchema } from "./type-on-pokemon.schema";
import { movesOnPokemonSchema } from "./moves-on-pokemon.schema";
import { pokemonOnAbilitySchema } from "./pokemon-on-ability.schema";

export const pokemonSchema = sqliteTable("POKEMON", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  baseExperience: integer("BASE_EXPERIENCE"),
  cries: text("CRIES"),
  image: text("IMAGE_NORMAL"),
  imageShiny: text("IMAGE_SHINY"),
  height: integer("HEIGHT"),
  weight: integer("WEIGHT"),
  speciesReference: text("SPECIES_REFERENCE").references(
    () => pokemonSpeciesSchema.id,
  ),
  speciesIndex: integer("SPECIES_INDEX").references(
    () => pokemonSpeciesSchema.index,
  ),
  hp: integer("HP"),
  attack: integer("ATTACK"),
  defence: integer("DEFENCE"),
  specialAttack: integer("SPECIAL_ATTACK"),
  specialDefence: integer("SPECIAL_DEFENCE"),
  speed: integer("SPEED"),
});

export const pokemonRelations = relations(pokemonSchema, ({ one, many }) => ({
  species: one(pokemonSpeciesSchema, {
    fields: [pokemonSchema.speciesReference],
    references: [pokemonSpeciesSchema.id],
  }),
  type: many(typeOnPokemonSchema),
  moves: many(movesOnPokemonSchema),
  ability: many(pokemonOnAbilitySchema),
}));

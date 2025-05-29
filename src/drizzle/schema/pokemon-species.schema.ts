import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generationSchema } from "./generation.schema";
import { relations } from "drizzle-orm";
import { pokemonSchema } from "./pokemon.schema";
import { pokemonSpeciesOnEggGroupSchema } from "./pokemon-species-on-egg-group.schema";
import { pokemonSpeciesOnFlavorTextSchema } from "./pokemon-species-on-flavor-text.schema";
import { pokemonSpeciesOnVarietySchema } from "./pokemon-species-on-variety.schema";

export const pokemonSpeciesSchema = sqliteTable("POKEMON_SPECIES", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  baseHappiness: integer("BASE_HAPPINESS"),
  captureRate: integer("CAPTURE_RATE"),
  color: text("COLOR"),
  evolutionChainReference: integer("EVOLUTION_CHAIN_REFERENCE"),
  formSwitchable: integer("FORM_SWITCHABLE", { mode: "boolean" }),
  genderRate: integer("GENDER_RATE"),
  genera: text("GENERA"),
  generationReference: text("GENERATION_REFERENCE").references(
    () => generationSchema.id
  ),
  growthRate: text("GROWTH_RATE"),
  habitat: text("HABITAT"),
  genderDifference: integer("GENDER_DIFFERENCE", { mode: "boolean" }),
  legendary: integer("LEGENDARY", { mode: "boolean" }),
  mythical: integer("MYTHICAL", { mode: "boolean" }),
  shape: text("SHAPE"),
});

export const pokemonSpeciesRelations = relations(
  pokemonSpeciesSchema,
  ({ one, many }) => ({
    generation: one(generationSchema, {
      fields: [pokemonSpeciesSchema.generationReference],
      references: [generationSchema.id],
    }),
    pokemon: many(pokemonSchema),
    egggroup: many(pokemonSpeciesOnEggGroupSchema),
    flavorText: many(pokemonSpeciesOnFlavorTextSchema),
    variety: many(pokemonSpeciesOnVarietySchema),
  })
);


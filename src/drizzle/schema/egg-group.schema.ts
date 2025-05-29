import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pokemonSpeciesOnEggGroupSchema } from "./pokemon-species-on-egg-group.schema";

export const eggGroupSchema = sqliteTable("EGG_GROUP", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
});

export const eggGroupRelations = relations(eggGroupSchema, ({ many }) => ({
  pokemonSpecies: many(pokemonSpeciesOnEggGroupSchema),
}));


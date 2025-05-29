import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { regionSchema } from "./region.schema";
import { abilitySchema } from "./ability.schema";
import { movesSchema } from "./moves.schema";
import { pokemonSpeciesSchema } from "./pokemon-species.schema";
import { versionGroupSchema } from "./version-group.schema";

export const generationSchema = sqliteTable("GENERATION", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  mainRegionReference: text("MAIN_REGION_REFERENCE"),
});

export const generationRelations = relations(
  generationSchema,
  ({ one, many }) => ({
    mainRegion: one(regionSchema, {
      fields: [generationSchema.mainRegionReference],
      references: [regionSchema.id],
    }),
    ability: many(abilitySchema),
    moves: many(movesSchema),
    pokemonSpecies: many(pokemonSpeciesSchema),
    versionGroup: many(versionGroupSchema),
  })
);


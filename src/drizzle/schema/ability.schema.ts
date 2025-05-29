import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generationSchema } from "./generation.schema";
import { relations } from "drizzle-orm";
import { pokemonOnAbilitySchema } from "./pokemon-on-ability.schema";
import { abilityOnFlavorTextSchema } from "./ability-on-flavor-text.schema";
import { abilityOnEffectEntrySchema } from "./ability-on-effect-entry.schema";

export const abilitySchema = sqliteTable("ABILITY", {
  id: text("ID").primaryKey(),
  index: integer("INDEX").unique(),
  name: text("NAME"),
  effect: text("EFFECT"),
  shortEffect: text("SHORT_EFFECT"),
  generationReference: text("GENERATION_REFERENCE").references(
    () => generationSchema.id,
  ),
});

export const abilityRelations = relations(abilitySchema, ({ one, many }) => ({
  generation: one(generationSchema, {
    fields: [abilitySchema.generationReference],
    references: [generationSchema.id],
  }),
  pokemon: many(pokemonOnAbilitySchema),
  flavorText: many(abilityOnFlavorTextSchema),
  effectEntry: many(abilityOnEffectEntrySchema),
}));
